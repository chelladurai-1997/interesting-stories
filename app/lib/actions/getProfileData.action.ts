"use server";

import connectMongo from "../constants/mongodb";
import BasicInformation from "../models/basicinfo.model";
import ContactInfo from "../models/contactInfo.model";
import EducationOccupation from "../models/educationOccupation.model";
import Expectations from "../models/expectationInfo.model";
import FamilyDetails from "../models/familyInfo.model";
import HoroscopeInfo from "../models/horoscopeInfo.model";

import { getUserFromSessionToken } from "../utils/getUserFromSessionToken";

export async function getProfileData() {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return { message: error || "User not found", error: true };
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch profile data using Promise.all
    const [
      basicInfo,
      contactInfo,
      educationOccupation,
      expectations,
      familyDetails,
      horoscopeInfo,
    ] = await Promise.all([
      BasicInformation.findOne({ userId }),
      ContactInfo.findOne({ userId }),
      EducationOccupation.findOne({ userId }),
      Expectations.findOne({ userId }),
      FamilyDetails.findOne({ userId }),
      HoroscopeInfo.findOne({ userId }),
    ]);

    return {
      message: "success",
      error: false,
      data: {
        basicInfo,
        contactInfo,
        educationOccupation,
        expectations,
        familyDetails,
        horoscopeInfo,
      },
    };
  } catch (error) {
    console.error("Error fetching profile data:", error);

    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      if (error.message.includes("MongoError")) {
        errorMessage = "Database error occurred.";
      } else {
        errorMessage = error.message;
      }
    }

    return { message: errorMessage, error: true };
  }
}
