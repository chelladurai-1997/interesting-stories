"use server";

import mongoose from "mongoose";
import connectMongo from "../constants/mongodb";
import EducationOccupation from "../models/educationOccupation.model";
import User from "../models/user.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { getStringFromFormData } from "../utils/formUtils";

// Define an interface for Education and Occupation data
interface EducationOccupationData {
  education: string;
  educationInfo: string;
  occupation: string;
  occupationInfo: string;
  workingPlace: string;
  monthlyIncome: string;
  userId: string | unknown;
}

// Function to handle education and occupation form submission
export async function handleEducationOccupationFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  const session = await mongoose.startSession();

  try {
    // Start the session transaction
    await session.withTransaction(
      async () => {
        await connectMongo(); // Ensure DB connection inside the transaction

        // Extract userId from token
        const { userId, error, message } = getUserIdFromToken();
        if (error) {
          throw new Error(message); // Throw an error to abort the transaction
        }

        // Extract data from formData
        const data: EducationOccupationData = {
          education: getStringFromFormData(formData, "education"),
          educationInfo: getStringFromFormData(formData, "educationInfo"),
          occupation: getStringFromFormData(formData, "occupation"),
          occupationInfo: getStringFromFormData(formData, "occupationInfo"),
          workingPlace: getStringFromFormData(formData, "workingPlace"),
          monthlyIncome: getStringFromFormData(formData, "monthlyIncome"),
          userId: userId,
        };

        // Save the education and occupation information to the database
        const educationOccupation = new EducationOccupation(data);
        await educationOccupation.save({ session });

        // Update the user's completedSections
        const user = await User.findByIdAndUpdate(
          { _id: userId },
          { $set: { "completedSections.educationOccupation": true } },
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
    console.error(
      "Error during education and occupation info submission:",
      error
    );
    return { message: "Something went wrong!", error: true };
  } finally {
    session.endSession(); // Ensure session ends
  }
}
