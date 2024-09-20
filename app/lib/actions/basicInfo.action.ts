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
  let session: mongoose.ClientSession | null = null;

  try {
    await connectMongo();

    // Start a session and transaction
    session = await mongoose.startSession();
    session.startTransaction();

    const { userId, error, message } = getUserIdFromToken();
    if (error) {
      await session.abortTransaction();
      session.endSession();
      return { message, error };
    }

    // Extract data from formData
    const data: BasicInfoData = {
      name: getStringFromFormData(formData, "name"),
      gender: getStringFromFormData(formData, "gender"),
      dob: getStringFromFormData(formData, "dob"),
      profile_created_by: getStringFromFormData(formData, "profile_created_by"),
      marital_status: getStringFromFormData(formData, "marital_status"),
      children: getStringFromFormData(formData, "children"),
      children_living_status: getStringFromFormData(
        formData,
        "children_living_status"
      ),
      profile_bio: getStringFromFormData(formData, "profile_bio"),
      userId: userId,
    };

    // Save the basic information to the database
    const basicInfo = new BasicInformation(data);
    await basicInfo.save({ session });

    // Find and update the user's completedSections
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { "completedSections.basicInfo": true } },
      { new: true, session } // Return the updated document
    );

    if (!user) {
      throw new Error("User not found");
    }

    await session.commitTransaction();
    return { message: "Success", error: false };
  } catch (error) {
    if (session) {
      await session.abortTransaction();
    }
    console.error("Error during basic info submission:", error);
    return { message: "Something went wrong!", error: true };
  } finally {
    if (session) {
      session.endSession();
    }
  }
}
