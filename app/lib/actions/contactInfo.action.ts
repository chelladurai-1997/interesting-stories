"use server";

import connectMongo, { MONGO_URI } from "../constants/mongodb";
import ContactInfo from "../models/contactInfo.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";
import { GridFSBucket, MongoClient } from "mongodb";

async function getMongoNativeConnection() {
  const client = new MongoClient(MONGO_URI as string);
  await client.connect();
  return client.db(); // Return the database instance
}

export async function onContactInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  const data = {
    mobile: formData.get("mobile"),
    sameAsMobile: formData.get("sameAsMobile") === "on", // Checkbox value
    whatsapp: formData.get("whatsapp"),
    country: formData.get("country"),
    state: formData.get("state"),
    district: formData.get("district"),
    address: formData.get("profile_address"),
    photo: formData.get("photo") as File, // This will be the file input
    pin_code: formData.get("pin_code"),
    userId,
  };

  try {
    // Connect to MongoDB through Mongoose (for your models)
    await connectMongo();

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
      uploadStream.end(fileBuffer);

      // Generate the image URL
      imageUrl = `/api/getFile?gridFSId=${uploadStream.id}`; // Store the URL for retrieval
    }

    // Save to database using Mongoose
    const contactInfo = new ContactInfo({
      mobile: formData.get("mobile"),
      sameAsMobile: formData.get("sameAsMobile") === "on", // Checkbox value
      whatsapp: formData.get("whatsapp"),
      country: formData.get("country"),
      state: formData.get("state"),
      district: formData.get("district"),
      address: formData.get("address"),
      photo: imageUrl, // Save the image URL instead of GridFS file ID
      pin_code: formData.get("pin_code"),
      userId,
    });

    console.log("contactInfo", contactInfo);

    await contactInfo.save();

    return { message: "success", error: false };
  } catch (error) {
    console.error("Error Details:", error);

    let errorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      if (error.message.includes("ENOENT")) {
        errorMessage = "File not found or path issue.";
      } else if (error.message.includes("EACCES")) {
        errorMessage = "Permission denied while accessing file.";
      } else if (error.message.includes("MongoError")) {
        errorMessage = "Database error occurred.";
      } else {
        errorMessage = error.message;
      }
    }

    return { message: errorMessage, error: true };
  }
}
