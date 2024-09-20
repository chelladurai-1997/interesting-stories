"use server";

import mongoose from "mongoose";
import connectMongo from "../constants/mongodb";
import PersonalDetails from "../models/personalInfo.model";
import User from "../models/user.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { getStringFromFormData } from "../utils/formUtils";

// Define an interface for Personal Information data
interface PersonalInfoData {
  religion: string;
  caste: string;
  kulam: string;
  kula_deivam: string;
  height: string;
  complexion: string;
  weight: string;
  blood_group: string;
  physically_challenged: boolean;
  physical_challenge_details: string;
  userId: string | unknown;
}

// Function to handle personal information form submission
export async function handlePersonalInfoFormSubmit(
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
    const data: PersonalInfoData = {
      religion: getStringFromFormData(formData, "religion"),
      caste: getStringFromFormData(formData, "caste"),
      kulam: getStringFromFormData(formData, "kulam"),
      kula_deivam: getStringFromFormData(formData, "kula_deivam"),
      height: getStringFromFormData(formData, "height"),
      complexion: getStringFromFormData(formData, "complexion"),
      weight: getStringFromFormData(formData, "weight"),
      blood_group: getStringFromFormData(formData, "blood_group"),
      physically_challenged:
        getStringFromFormData(formData, "physically_challenged") === "Yes",
      physical_challenge_details: getStringFromFormData(
        formData,
        "physical_challenge_details"
      ),
      userId: userId,
    };

    // Save the personal information to the database
    const personalInfo = new PersonalDetails(data);
    await personalInfo.save({ session });

    // Update the user's completedSections
    await User.findByIdAndUpdate(
      { _id: userId },
      { $set: { "completedSections.personalDetails": true } },
      { session }
    );

    await session.commitTransaction();
    return { message: "Success", error: false };
  } catch (error) {
    await session.abortTransaction();
    console.error("Error during personal info submission:", error);
    return { message: "Something went wrong!", error: true };
  } finally {
    session.endSession();
  }
}
