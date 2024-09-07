import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import Expectations from "@/app/lib/models/expectationInfo.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import { NextResponse } from "next/server";

// Handler for fetching profile data
export async function GET(request: Request) {
  // Extract userId from URL parameters
  const url = new URL(request.url);
  const userId = url.searchParams.get("id");

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
    ] = await Promise.all([
      BasicInformation.findOne({ userId }),
      ContactInfo.findOne({ userId }),
      EducationOccupation.findOne({ userId }),
      Expectations.findOne({ userId }),
      FamilyDetails.findOne({ userId }),
      HoroscopeInfo.findOne({ userId }),
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
      },
      error: false,
    });

    // Set Cache-Control headers to instruct the browser to cache the response
    response.headers.set("Cache-Control", "public, max-age=3600"); // Cache for 1 hour (3600 seconds)

    // Return the profile data
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

    // Return an error response
    return NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );
  }
}
