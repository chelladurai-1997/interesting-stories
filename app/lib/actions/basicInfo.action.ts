"use server";

import mongoose from "mongoose";
import connectMongo from "../constants/mongodb";
import BasicInformation from "../models/basicinfo.model";
import User from "../models/user.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { getStringFromFormData } from "../utils/formUtils";

// Define an interface for Basic Information data
interface BasicInfoData {
  name: string;
  gender: string;
  dob: string;
  profile_created_by: string;
  marital_status: string;
  children: string;
  children_living_status: string;
  profile_bio: string;
  userId: string | unknown;
}

// Main function to handle basic information submission
export async function handleBasicInfoSubmission(
  _prevData: unknown,
  formData: FormData
) {
  await connectMongo(); // Ensure DB connection before starting session
  const session = await mongoose.startSession();

  try {
    const { userId, error, message } = getUserIdFromToken();
    if (error) {
      return { message, error }; // Handle token error gracefully
    }

    // Extract data from formData
    const data: BasicInfoData = {
      name: getStringFromFormData(formData, "name"),
      gender: getStringFromFormData(formData, "gender"),
      dob: getStringFromFormData(formData, "dob"),
      profile_created_by: getStringFromFormData(formData, "profile_created_by"),
      marital_status: getStringFromFormData(formData, "marital_status"),
      children: getStringFromFormData(formData, "children"),
      children_living_status:
        getStringFromFormData(formData, "children_living_status") ??
        "Not applicable",
      profile_bio: getStringFromFormData(formData, "profile_bio"),
      userId: userId,
    };

    // Use withTransaction to handle the transaction
    await session.withTransaction(
      async () => {
        // Save the basic information to the database
        const basicInfo = new BasicInformation(data);
        await basicInfo.save({ session });

        // Update the user's completedSections
        const user = await User.findOneAndUpdate(
          { _id: userId },
          { $set: { "completedSections.basicInfo": true } },
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
    console.error("Error during basic info submission:", error);
    return { message: "Something went wrong!", error: true };
  } finally {
    session.endSession(); // Ensure session ends
  }
}
