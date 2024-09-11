import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import Expectations from "@/app/lib/models/expectationInfo.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
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
    const profiles = await BasicInformation.aggregate([
      {
        $lookup: {
          from: ContactInfo.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "contactInfo",
        },
      },
      {
        $lookup: {
          from: EducationOccupation.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "educationOccupation",
        },
      },
      {
        $lookup: {
          from: Expectations.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "expectations",
        },
      },
      {
        $lookup: {
          from: FamilyDetails.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "familyDetails",
        },
      },
      {
        $lookup: {
          from: HoroscopeInfo.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "horoscopeInfo",
        },
      },
      {
        $project: {
          _id: 0, // Exclude _id field
          userId: 1,
          name: 1,
          gender: 1,
          dob: 1,
          profile_created_by: 1,
          marital_status: 1,
          children: 1,
          children_living_status: 1,
          profile_bio: 1,
          contactInfo: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$contactInfo",
                  as: "contact",
                  in: {
                    // Include fields except _id
                    phoneNumber: "$$contact.mobile",
                    whatsapp: "$$contact.whatsapp",
                  },
                },
              },
              0,
            ],
          },
          educationOccupation: { $arrayElemAt: ["$educationOccupation", 0] },
          expectations: { $arrayElemAt: ["$expectations", 0] },
          familyDetails: { $arrayElemAt: ["$familyDetails", 0] },
          horoscopeInfo: { $arrayElemAt: ["$horoscopeInfo", 0] },
        },
      },
      {
        $skip: (page - 1) * limit, // Skip documents for pagination
      },
      {
        $limit: limit, // Limit documents per page
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
    response.headers.set("Cache-Control", "public, max-age=3600");

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
