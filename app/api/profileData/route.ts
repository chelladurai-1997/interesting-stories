import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import Expectations from "@/app/lib/models/expectationInfo.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import { getUserFromSessionToken } from "@/app/lib/utils/getUserFromSessionToken";
import { NextResponse } from "next/server";

// Handler for fetching profile data
export async function GET() {
  // Get the user from the session token
  const { userId, error } = await getUserFromSessionToken();

  if (error || !userId) {
    return NextResponse.json(
      { message: error || "User not found", error: true },
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
    ] = await Promise.all([
      BasicInformation.findOne({ userId }),
      ContactInfo.findOne({ userId }),
      EducationOccupation.findOne({ userId }),
      Expectations.findOne({ userId }),
      FamilyDetails.findOne({ userId }),
      HoroscopeInfo.findOne({ userId }),
    ]);

    // Return the profile data
    return NextResponse.json({
      message: "Profile data fetched successfully",
      data: {
        basicInfo,
        contactInfo,
        educationOccupation,
        expectations,
        familyDetails,
        horoscopeInfo,
      },
      error: false,
    });
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

    // Return an error response
    return NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );
  }
}
