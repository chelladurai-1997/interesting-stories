"use server";

import mongoose from "mongoose";
import connectMongo, { getMongoNativeConnection } from "../constants/mongodb";
import HoroscopeInfo from "../models/horoscopeInfo.model";
import { GridFSBucket } from "mongodb";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import User from "../models/user.model";
import { uploadFileToGridFS } from "../utils/uploadFileToGridFS";
import { reduceImageSize } from "../utils/compressImageUtils";

// Function to handle horoscope information form submission
export async function handleHoroscopeInfoSubmission(
  _prevData: unknown,
  formData: FormData
) {
  const session = await mongoose.startSession();

  try {
    // Use withTransaction to handle the transaction
    await session.withTransaction(
      async () => {
        await connectMongo(); // Ensure DB connection inside the transaction

        // Extract userId from token
        const { userId, error, message } = getUserIdFromToken();
        if (error) {
          throw new Error(message); // Throw an error to abort the transaction
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

        // Check if upload is present
        if (!data.upload) {
          throw new Error("File upload is required"); // Throw an error for missing file
        }

        // Convert File to Buffer
        const fileBuffer = Buffer.from(await data.upload.arrayBuffer());

        // Resize and compress the image
        const reducedBuffer = await reduceImageSize(fileBuffer);

        // Get the native MongoDB connection for GridFS
        const db = await getMongoNativeConnection();
        const bucket = new GridFSBucket(db, { bucketName: "profileImages" });

        // Handle file upload to GridFS with the reduced image
        const imageUrl = await uploadFileToGridFS(
          new File([reducedBuffer], data.upload.name, {
            type: data.upload.type,
          }),
          bucket,
          userId!
        );

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
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: { "completedSections.horoscope": true } },
          { new: true, session } // Return the updated document
        );

        if (!user) {
          throw new Error("User not found");
        }
      },
      {
        readConcern: { level: "local" },
        writeConcern: { w: "majority" },
        readPreference: "primary",
      }
    );

    return { message: "Success", error: false };
  } catch (error) {
    console.error("Error during horoscope info submission:", error);

    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      error: true,
    };
  } finally {
    session.endSession(); // Ensure session ends
  }
}
