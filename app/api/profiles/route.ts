import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import PersonalDetails from "@/app/lib/models/personalInfo.model";
import User from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";

// Handler for fetching paginated profiles data
export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);

  try {
    // Connect to MongoDB
    await connectMongo();

    // Aggregation pipeline to join data from multiple collections and format the output
    const profiles = await User.aggregate([
      {
        $match: {
          adminApproved: true,
        },
      },
      {
        $lookup: {
          from: BasicInformation.collection.name,
          localField: "_id",
          foreignField: "userId",
          as: "basicInformation",
        },
      },
      { $unwind: "$basicInformation" }, // Ensure basic information exists
      {
        $lookup: {
          from: PersonalDetails.collection.name,
          localField: "_id",
          foreignField: "userId",
          as: "personalInfo",
        },
      },
      { $unwind: { path: "$personalInfo", preserveNullAndEmptyArrays: true } }, // Optional
      {
        $lookup: {
          from: EducationOccupation.collection.name,
          localField: "_id",
          foreignField: "userId",
          as: "educationOccupation",
        },
      },
      {
        $unwind: {
          path: "$educationOccupation",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: FamilyDetails.collection.name,
          localField: "_id",
          foreignField: "userId",
          as: "familyDetails",
        },
      },
      { $unwind: { path: "$familyDetails", preserveNullAndEmptyArrays: true } }, // Optional
      {
        $lookup: {
          from: ContactInfo.collection.name,
          localField: "_id",
          foreignField: "userId",
          as: "contactInfo",
        },
      },
      { $unwind: { path: "$contactInfo", preserveNullAndEmptyArrays: true } }, // Optional
      {
        $lookup: {
          from: HoroscopeInfo.collection.name,
          localField: "_id",
          foreignField: "userId",
          as: "horoscopeInfo",
        },
      },
      { $unwind: { path: "$horoscopeInfo", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          userId: "$_id",
          name: "$basicInformation.name",
          dob: "$basicInformation.dob",
          marital_status: "$basicInformation.marital_status",
          personalDetails: {
            height: "$personalInfo.height",
            kulaDeivam: "$personalInfo.kulaDeivam",
            kulam: "$personalInfo.kulam",
          },
          "educationOccupation.education": 1,
          "educationOccupation.occupation": 1,
          "familyDetails.livingPlace": 1,
          contactInfo: {
            profileImgUrl: "$contactInfo.photo",
          },
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: limit,
      },
    ]);

    // Set Cache-Control headers to cache the response for 1 hour
    const response = NextResponse.json({
      message: "Profiles fetched successfully",
      data: profiles,
      page,
      limit,
      error: false,
    });
    // response.headers.set("Cache-Control", "public, max-age=900");

    return response;
  } catch (error) {
    console.error("Error fetching profiles:", error);

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
