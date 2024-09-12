// app/api/profiles/[userId]/route.ts

import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import Expectations from "@/app/lib/models/expectationInfo.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import PersonalDetails from "@/app/lib/models/personalInfo.model";
import { NextResponse } from "next/server";

// Handler for fetching profile data for a specific user
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required", error: true },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Fetch profile data from multiple collections
    const [
      basicInfo,
      contactInfo,
      educationOccupation,
      expectations,
      familyDetails,
      horoscopeInfo,
      personalDetails,
    ] = await Promise.all([
      BasicInformation.findOne({ userId }),
      ContactInfo.findOne({ userId }),
      EducationOccupation.findOne({ userId }),
      Expectations.findOne({ userId }),
      FamilyDetails.findOne({ userId }),
      HoroscopeInfo.findOne({ userId }),
      PersonalDetails.findOne({ userId }),
    ]);

    const response = NextResponse.json({
      message: "Profile data fetched successfully",
      data: {
        basicInfo,
        contactInfo,
        educationOccupation,
        expectations,
        familyDetails,
        horoscopeInfo,
        personalDetails,
      },
      error: false,
    });

    response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    return response;
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

    return NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );
  }
}
