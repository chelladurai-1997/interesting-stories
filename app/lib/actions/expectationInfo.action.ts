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
  session.startTransaction();

  try {
    await connectMongo();

    // Extract userId from token
    const { userId, error, message } = getUserIdFromToken();
    if (error) {
      // Abort transaction in case of error
      return { message, error };
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
    await User.findByIdAndUpdate(
      userId,
      { $set: { "completedSections.expectation": true } },
      { session }
    );

    // Commit transaction once all operations are successful
    await session.commitTransaction();
    return { message: "Success", error: false };
  } catch (error) {
    // Abort the transaction if any error occurs
    await session.abortTransaction();
    console.error("Error during expectations info submission:", error);

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
