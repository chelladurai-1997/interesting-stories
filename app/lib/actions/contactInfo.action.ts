"use server";

import connectMongo, { MONGO_URI } from "../constants/mongodb";
import ContactInfo from "../models/contactInfo.model";
import { GridFSBucket, MongoClient } from "mongodb";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { updateUserLastCompletedStep } from "../utils/userUtils";

// Define a type for the data extracted from FormData
interface ContactFormData {
  mobile: string | null;
  sameAsMobile: boolean;
  whatsapp: string | null;
  country: string | null;
  state: string | null;
  district: string | null;
  address: string | null;
  pin_code: string | null;
  photo: File | null;
}

// Function to get a native MongoDB connection for GridFS
async function getMongoNativeConnection() {
  const client = new MongoClient(MONGO_URI!, { useUnifiedTopology: true });
  await client.connect();
  return client.db(); // Return the database instance
}

// Server Action to handle contact info form submission
export async function onContactInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
): Promise<{ message: string; error: boolean }> {
  const { userId, error } = getUserIdFromToken();
  if (error || !userId) {
    return { message: "Unauthorized", error: true };
  }

  // Extract form data and type-cast to the interface
  const data: ContactFormData = {
    mobile: formData.get("mobile") as string | null,
    sameAsMobile: formData.get("sameAsMobile") === "on",
    whatsapp: formData.get("whatsapp") as string | null,
    country: formData.get("country") as string | null,
    state: formData.get("state") as string | null,
    district: formData.get("district") as string | null,
    address: formData.get("address") as string | null,
    pin_code: formData.get("pin_code") as string | null,
    photo: formData.get("photo") as File | null,
  };

  if (!data.photo) {
    return { message: "File upload is required", error: true };
  }

  try {
    // Connect to MongoDB through Mongoose (for your models)
    await connectMongo();

    // Get the user from the session token
    const { userId, error, message } = getUserIdFromToken();
    if (error) {
      return { message, error };
    }

    // Get the native MongoDB connection for GridFS
    const db = await getMongoNativeConnection(); // Use the native MongoDB driver

    // Set up GridFS
    const bucket = new GridFSBucket(db, {
      bucketName: "profileImages",
    });

    // Handle file upload to GridFS
    const uploadFile = data.photo as File;
    let imageUrl = null;

    if (uploadFile) {
      const uploadStream = bucket.openUploadStream(uploadFile.name, {
        contentType: uploadFile.type,
        metadata: {
          originalName: uploadFile.name,
          uploadedBy: userId,
          size: uploadFile.size, // You can add any custom metadata here
        },
      });

      const fileBuffer = Buffer.from(await uploadFile.arrayBuffer());
      console.log("uploadStream.started", uploadStream.id);

      // Wait for the upload to finish before proceeding
      await new Promise<void>((resolve, reject) => {
        uploadStream.end(fileBuffer);
        uploadStream.on("finish", () => {
          console.log("uploadStream.success", uploadStream.id);
          imageUrl = `/api/file/${uploadStream.id}`; // Store the URL for retrieval
          resolve();
        });
        uploadStream.on("error", (error) => {
          console.log("uploadStream.error", uploadStream.id);

          reject(error);
        });
      });
    }

    // Save contact info along with the photo URL to MongoDB
    const contactInfo = new ContactInfo({
      mobile: data.mobile,
      sameAsMobile: data.sameAsMobile,
      whatsapp: data.whatsapp,
      country: data.country,
      state: data.state,
      district: data.district,
      address: data.address,
      pin_code: data.pin_code,
      photo: imageUrl, // Store the GridFS image URL
      userId,
    });

    await contactInfo.save();

    // Update user step (e.g., update the last completed step for the user)
    updateUserLastCompletedStep({ userId: userId!, step: 7 });

    return { message: "Contact info saved successfully", error: false };
  } catch (error) {
    console.error("Error occurred:", error);

    return {
      message:
        error instanceof Error
          ? error.message
          : "An error occurred while saving the contact info.",
      error: true,
    };
  }
}
