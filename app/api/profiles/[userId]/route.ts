// app/api/profiles/[userId]/route.ts

import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import Expectations from "@/app/lib/models/expectationInfo.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import PersonalDetails from "@/app/lib/models/personalInfo.model";
import User from "@/app/lib/models/user.model";
import { getUserIdFromToken } from "@/app/lib/utils/getUserIdFromToken";
import { maskAddress } from "@/app/lib/utils/maskAddress";
import { maskNumber } from "@/app/lib/utils/maskMobileNumber";
import { NextResponse } from "next/server";

// Handler for fetching profile data for a specific user
export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;

  let isUserLoggedIn = false;
  let isAdminApproved = false;

  // Extract user Id from access token, This will return null which means invalid user id or token expired.
  const { userId: loggedInUserId } = getUserIdFromToken();

  // Check if the user is approved by admin
  if (loggedInUserId) {
    isUserLoggedIn = true;
    const user = await User.findById(userId).select("adminApproved");
    isAdminApproved = user ? user.adminApproved : false;
  }

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
      BasicInformation.findOne({ userId }).select("-userId"),
      ContactInfo.findOne({ userId }).select("-userId"),
      EducationOccupation.findOne({ userId }).select("-userId"),
      Expectations.findOne({ userId }).select("-userId"),
      FamilyDetails.findOne({ userId }).select("-userId"),
      HoroscopeInfo.findOne({ userId }).select("-userId"),
      PersonalDetails.findOne({ userId }).select("-userId"),
    ]);

    // Mask mobile and WhatsApp numbers for non-logged in users
    if (contactInfo && (!isUserLoggedIn || !isAdminApproved)) {
      contactInfo.mobile = maskNumber(contactInfo.mobile);
      contactInfo.whatsapp = maskNumber(contactInfo.whatsapp);
      contactInfo.address = maskAddress(contactInfo.address);
    }

    const response = NextResponse.json({
      message: "Profile data fetched successfully",
      data: {
        userId,
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

    // response.headers.set("Cache-Control", "public, max-age=3600");
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
