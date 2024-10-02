"use server";

import mongoose from "mongoose";
import connectMongo from "../constants/mongodb";
import FamilyDetails from "../models/familyInfo.model";
import User from "../models/user.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { getStringFromFormData } from "../utils/formUtils";

// Function to handle family information form submission
export async function handleFamilyInfoSubmission(
  _prevData: unknown,
  formData: FormData
) {
  const session = await mongoose.startSession();

  try {
    // Use withTransaction to handle the transaction
    await session.withTransaction(async () => {
      await connectMongo(); // Ensure DB connection inside the transaction

      // Extract userId from token
      const { userId, error, message } = getUserIdFromToken();
      if (error) {
        throw new Error(message); // Throw an error to abort the transaction
      }

      // Extract data from formData
      const data = {
        fatherName: getStringFromFormData(formData, "father_name"),
        fatherStatus: getStringFromFormData(formData, "father_status"),
        motherName: getStringFromFormData(formData, "mother_name"),
        motherStatus: getStringFromFormData(formData, "mother_status"),
        fatherOccupation: getStringFromFormData(formData, "father_occupation"),
        motherOccupation: getStringFromFormData(formData, "mother_occupation"),
        motherKulam: getStringFromFormData(formData, "mother_kulam"),
        livingPlace: getStringFromFormData(formData, "living_place"),
        nativePlace: getStringFromFormData(formData, "native_place"),
        noOfBrothers: getStringFromFormData(formData, "no_of_brothers"),
        noOfBrothersMarried: getStringFromFormData(
          formData,
          "no_of_brothers_married"
        ),
        noOfSisters: getStringFromFormData(formData, "no_of_sisters"),
        noOfSistersMarried: getStringFromFormData(
          formData,
          "no_of_sisters_married"
        ),
        property: getStringFromFormData(formData, "property"),
        propertyInfo: getStringFromFormData(formData, "property_info"),
        userId,
      };

      // Save the family details to the database
      const familyDetails = new FamilyDetails(data);
      await familyDetails.save({ session });

      // Update the user's completedSections
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $set: { "completedSections.familyDetails": true } },
        { new: true, session } // Return the updated document
      );

      if (!user) {
        throw new Error("User not found");
      }
    });

    return { message: "Success", error: false };
  } catch (error) {
    console.error("Error during family info submission:", error);

    return {
      message: error instanceof Error ? error.message : "Something went wrong!",
      error: true,
    };
  } finally {
    session.endSession(); // Ensure session ends
  }
}
