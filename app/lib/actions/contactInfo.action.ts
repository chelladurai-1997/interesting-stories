"use server";

import connectMongo from "../constants/mongodb";
import ContactInfo from "../models/contactInfo.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

// AWS S3 Client
// const s3Client = new S3Client({ region: process.env.AWS_REGION });

export async function onContactInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  // Extract the photo (file) from the form data
  const photo = formData.get("photo") as File;

  // If no photo is uploaded, handle appropriately
  // if (!photo) {
  //   return { message: "Photo is required", error: true };
  // }

  try {
    // 1. Generate a unique key for the file
    // const fileKey = uuidv4(); // Unique file key for the S3 object

    // 2. Upload the file directly to S3
    // const uploadParams = {
    //   Bucket: process.env.AWS_BUCKET_NAME as string,
    //   Key: fileKey,
    //   Body: photo,
    //   ACL: "public-read" as ObjectCannedACL, // Cast to the correct type
    //   ContentType: photo.type, // Ensure correct content type
    // };

    // const s3Response = await s3Client.send(new PutObjectCommand(uploadParams));

    // Check if the S3 upload was successful
    // if (!s3Response || s3Response.$metadata.httpStatusCode !== 200) {
    //   throw new Error("Failed to upload image to S3");
    // }

    // 3. Construct the image URL
    // const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const imageUrl = `https://plus.unsplash.com/premium_photo-1664540415069-bc45ce3e711e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3Jvb218ZW58MHx8MHx8fDA%3D`;

    // 4. Connect to MongoDB through Mongoose (for your models)
    await connectMongo();

    // 5. Save the form data and image URL to the database
    const contactInfo = new ContactInfo({
      mobile: formData.get("mobile"),
      sameAsMobile: formData.get("sameAsMobile") === "on", // Checkbox value
      whatsapp: formData.get("whatsapp"),
      country: formData.get("country"),
      state: formData.get("state"),
      district: formData.get("district"),
      address: formData.get("address"),
      photo: imageUrl, // Save the S3 image URL in the database
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
