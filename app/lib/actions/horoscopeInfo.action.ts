"use server";

import connectMongo, { MONGO_URI } from "../constants/mongodb";
import HoroscopeInfo from "../models/horoscopeInfo.model";
import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";
import { GridFSBucket, MongoClient } from "mongodb";

// Function to get a native MongoDB connection for GridFS
async function getMongoNativeConnection() {
  const client = new MongoClient(MONGO_URI as string);
  await client.connect();
  return client.db(); // Return the database instance
}

export async function onHoroscopeInfoFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const data = {
    raasi: formData.get("raasi"),
    nachathiram: formData.get("nachathiram"),
    lagnam: formData.get("lagnam"),
    dhisaiIrupu: formData.get("dhisai_irupu"),
    dhosam: formData.get("dhosam"),
    upload: formData.get("upload") as File,
  };

  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }
  // Connect to MongoDB through Mongoose (for your models)
  await connectMongo();

  // Get the native MongoDB connection for GridFS
  const db = await getMongoNativeConnection(); // Use the native MongoDB driver

  // Set up GridFS
  const bucket = new GridFSBucket(db, {
    bucketName: "profileImages",
  });

  // Handle file upload to GridFS
  const uploadFile = data.upload as File;
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

  try {
    // Connect to MongoDB through Mongoose
    await connectMongo();

    // Save horoscope info with the file URL to MongoDB
    const horoscopeInfo = new HoroscopeInfo({
      raasi: data.raasi,
      nachathiram: data.nachathiram,
      lagnam: data.lagnam,
      dhisaiIrupu: data.dhisaiIrupu,
      dhosam: data.dhosam,
      upload: imageUrl, // Save the GridFS URL instead of the local file path
      userId,
    });

    await horoscopeInfo.save();

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
