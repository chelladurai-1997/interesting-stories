"use server";

import mongoose from "mongoose";
import connectMongo, { getMongoNativeConnection } from "../constants/mongodb";
import HoroscopeInfo from "../models/horoscopeInfo.model";
import { GridFSBucket } from "mongodb";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import User from "../models/user.model";
import { uploadFileToGridFS } from "../utils/uploadFileToGridFS";

// Function to handle horoscope information form submission
export async function handleHoroscopeInfoSubmission(
  _prevData: unknown,
  formData: FormData
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    await connectMongo();

    // Extract userId from token
    const { userId, error, message } = getUserIdFromToken();
    if (error) {
      await session.abortTransaction();
      session.endSession();
      return { message, error };
    }

    // Extract data from formData
    const data = {
      raasi: formData.get("raasi"),
      nachathiram: formData.get("nachathiram"),
      lagnam: formData.get("lagnam"),
      dhisaiIrupu: formData.get("dhisai_irupu"),
      dhosam: formData.get("dhosam"),
      upload: formData.get("upload") as File,
    };

    // Get the native MongoDB connection for GridFS
    const db = await getMongoNativeConnection();
    const bucket = new GridFSBucket(db, { bucketName: "profileImages" });

    // Upload file to GridFS and get the file URL
    const imageUrl = await uploadFileToGridFS(data.upload, bucket, userId!);

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

    await horoscopeInfo.save({ session });

    // Update the user's completedSections
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { "completedSections.horoscope": true } },
      { session }
    );

    await session.commitTransaction();
    return { message: "Success", error: false };
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during horoscope info submission:", error);

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
  } finally {
    session.endSession();
  }
}
