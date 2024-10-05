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
import { maskAddress } from "@/app/lib/utils/maskAddress";
import { maskNumber } from "@/app/lib/utils/maskMobileNumber";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const { userId } = params;
  let isUserLoggedIn = false;
  let isAdminApproved = false;
  let isInterestAccepted = false;

  // Extract user Id from token
  const { userId: loggedInUserId } = getUserIdFromToken();

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required", error: true },
      { status: 400 }
    );
  }

  try {
    await connectMongo(); // Ensure database connection

    if (loggedInUserId) {
      isUserLoggedIn = true;
      const user = await User.findById(userId).select("adminApproved");
      isAdminApproved = user ? user.adminApproved : false;

      const senderObjectId = new mongoose.Types.ObjectId(
        loggedInUserId as string
      );
      const receiverObjectId = new mongoose.Types.ObjectId(userId as string);

      const interest = await Interests.findOne({
        senderId: senderObjectId,
        receiverId: receiverObjectId,
      });

      isInterestAccepted = interest
        ? interest.status === InterestStatus.ACCEPTED
        : false;
    }

    const isMaskingRequired =
      !isUserLoggedIn || !isAdminApproved || !isInterestAccepted;

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

    if (contactInfo && isMaskingRequired) {
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

    return response;
  } catch (error) {
    console.error("Error fetching profile data:", error);

    let errorMessage = "An unknown error occurred.";
    if (error instanceof mongoose.Error) {
      errorMessage = "A database error occurred.";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );
  }
}
