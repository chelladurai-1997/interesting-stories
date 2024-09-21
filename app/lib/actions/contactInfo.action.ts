"use server";

import mongoose from "mongoose";
import connectMongo, { getMongoNativeConnection } from "../constants/mongodb";
import ContactInfo from "../models/contactInfo.model";
import User from "../models/user.model";
import { GridFSBucket } from "mongodb";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { getStringFromFormData } from "../utils/formUtils";
import { uploadFileToGridFS } from "../utils/uploadFileToGridFS";

// Define an interface for Contact information data
interface ContactFormData {
  mobile: string;
  sameAsMobile: boolean;
  whatsapp: string;
  country: string;
  state: string;
  district: string;
  address: string;
  pin_code: string;
  photo: File;
}

// Function to handle contact info form submission
export async function handleContactInfoSubmission(
  _prevData: unknown,
  formData: FormData
): Promise<{ message: string; error: boolean }> {
  const session = await mongoose.startSession();

  try {
    // Use withTransaction to handle the transaction
    await session.withTransaction(async () => {
      await connectMongo(); // Ensure DB connection inside the transaction

      // Extract userId from token
      const { userId, error: tokenError } = getUserIdFromToken();
      if (tokenError || !userId) {
        throw new Error("Unauthorized"); // Throw an error to abort the transaction
      }

      // Extract data from formData
      const data: ContactFormData = {
        mobile: getStringFromFormData(formData, "mobile")!,
        sameAsMobile: formData.get("sameAsMobile") === "on",
        whatsapp: getStringFromFormData(formData, "whatsapp")!,
        country: getStringFromFormData(formData, "country")!,
        state: getStringFromFormData(formData, "state")!,
        district: getStringFromFormData(formData, "district")!,
        address: getStringFromFormData(formData, "address")!,
        pin_code: getStringFromFormData(formData, "pin_code")!,
        photo: formData.get("photo") as File,
      };

      // Check if photo is uploaded
      if (!data.photo) {
        throw new Error("File upload is required"); // Throw an error for missing photo
      }

      // Get the native MongoDB connection for GridFS
      const db = await getMongoNativeConnection();
      const bucket = new GridFSBucket(db, { bucketName: "profileImages" });

      // Handle file upload to GridFS
      const imageUrl = await uploadFileToGridFS(data.photo, bucket, userId!);

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

      await contactInfo.save({ session });

      // Update the user's completedSections
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            "completedSections.contactDetails": true,
            isRegistrationComplete: true,
          },
        },
        { session }
      );
    });

    return { message: "Contact info saved successfully", error: false };
  } catch (error) {
    console.error("Error during contact info submission:", error);
    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      error: true,
    };
  } finally {
    session.endSession(); // Ensure session ends
  }
}
