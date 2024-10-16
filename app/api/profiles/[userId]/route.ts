import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import Expectations from "@/app/lib/models/expectationInfo.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import Interests, { InterestStatus } from "@/app/lib/models/interest.model";
import PersonalDetails from "@/app/lib/models/personalInfo.model";
import User from "@/app/lib/models/user.model";
import { getUserIdFromToken } from "@/app/lib/utils/getUserIdFromToken";
import { handleServerError } from "@/app/lib/utils/handleServerError";
import { maskAddress } from "@/app/lib/utils/maskAddress";
import { maskNumber } from "@/app/lib/utils/maskMobileNumber";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params; // Extract userId from URL params
  let isUserLoggedIn = false;
  let isAdminApproved = false;
  let isInterestAccepted = false;

  // Extract the logged-in user's ID from the token (for authentication checks)
  const { userId: loggedInUserId } = getUserIdFromToken();

  // Validate that userId is provided in the request
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required", error: true },
      { status: 400 }
    );
  }

  try {
    // Ensure connection to the MongoDB database
    await connectMongo();

    // If the user is logged in, perform additional checks
    if (loggedInUserId) {
      isUserLoggedIn = true;

      // Fetch admin approval status of the requested user
      const user = await User.findById(userId).select("adminApproved");
      isAdminApproved = user ? user.adminApproved : false;

      // Convert both logged-in user ID and requested user ID to ObjectId format
      const senderObjectId = new mongoose.Types.ObjectId(
        loggedInUserId as string
      );
      const receiverObjectId = new mongoose.Types.ObjectId(userId as string);

      // Check if there's an interest between the logged-in user and the requested user
      const interest = await Interests.findOne({
        senderId: senderObjectId,
        receiverId: receiverObjectId,
      });

      // If interest is found and status is 'ACCEPTED', mark it accordingly
      isInterestAccepted = interest
        ? interest.status === InterestStatus.ACCEPTED
        : false;
    }

    // Check if the logged-in user is viewing their own profile
    const isUserViewingOwnProfile = isUserLoggedIn && userId === loggedInUserId;

    // Determine whether masking of contact info is required
    const isMaskingRequired = isUserViewingOwnProfile
      ? false
      : !isUserLoggedIn || !isAdminApproved || !isInterestAccepted;

    // Fetch various sections of the user's profile in parallel
    const [
      basicInfo,
      contactInfo,
      educationOccupation,
      expectations,
      familyDetails,
      horoscopeInfo,
      personalDetails,
    ] = await Promise.all([
      BasicInformation.findOne({ userId }).select("-userId"), // Exclude userId from returned document
      ContactInfo.findOne({ userId }).select("-userId"),
      EducationOccupation.findOne({ userId }).select("-userId"),
      Expectations.findOne({ userId }).select("-userId"),
      FamilyDetails.findOne({ userId }).select("-userId"),
      HoroscopeInfo.findOne({ userId }).select("-userId"),
      PersonalDetails.findOne({ userId }).select("-userId"),
    ]);

    // If contact information is fetched and masking is required, mask sensitive fields
    if (contactInfo && isMaskingRequired) {
      contactInfo.mobile = maskNumber(contactInfo.mobile); // Mask mobile number
      contactInfo.whatsapp = maskNumber(contactInfo.whatsapp); // Mask WhatsApp number
      contactInfo.address = maskAddress(contactInfo.address); // Mask physical address
    }

    // Return the fetched profile data in the response
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

    return response;
  } catch (error) {
    console.error("Error fetching profile data:", error); // Log the error for debugging
    return handleServerError(error);
  }
}
