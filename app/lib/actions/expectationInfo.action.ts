"use server";

import mongoose from "mongoose";
import connectMongo from "../constants/mongodb";
import Expectations from "../models/expectationInfo.model";
import User from "../models/user.model";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

// Function to handle expectations information form submission
export async function handleExpectationsInfoSubmission(
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
          jaadhagam: formData.get("jaadhagam"),
          marital_status: formData.get("marital_status"),
          working_place: formData.get("working_place"),
          expecting_stars: formData.get("expecting_stars"),
          expectation_info: formData.get("expectation_info"),
          userId,
        };

        // Save the expectations info to the database
        const expectationsInfo = new Expectations(data);
        await expectationsInfo.save({ session });

        // Update the user's completedSections
        const user = await User.findByIdAndUpdate(
          userId,
          { $set: { "completedSections.expectation": true } },
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
    console.error("Error during expectations info submission:", error);

    return {
      message:
        error instanceof Error ? error.message : "An unknown error occurred.",
      error: true,
    };
  } finally {
    session.endSession(); // Ensure session ends
  }
}
