import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import PersonalDetails from "@/app/lib/models/personalInfo.model";
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
          from: PersonalDetails.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "personalInfo",
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
          from: FamilyDetails.collection.name,
          localField: "userId",
          foreignField: "userId",
          as: "familyDetails",
        },
      },
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
          dob: 1,
          marital_status: 1,
          educationOccupation: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$educationOccupation",
                  as: "educationOccupation",
                  in: {
                    education: "$$educationOccupation.education",
                    occupation: "$$educationOccupation.occupation",
                  },
                },
              },
              0,
            ],
          },

          familyDetails: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$familyDetails",
                  as: "familyDetails",
                  in: {
                    livingPlace: "$$familyDetails.livingPlace",
                  },
                },
              },
              0,
            ],
          },

          personalDetails: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$personalInfo",
                  as: "personalInfo",
                  in: {
                    height: "$$personalInfo.height",
                    kulaDeivam: "$$personalInfo.kula_deivam",
                    kulam: "$$personalInfo.kulam",
                  },
                },
              },
              0,
            ],
          },
          contactInfo: {
            $arrayElemAt: [
              {
                $map: {
                  input: "$contactInfo",
                  as: "contactInfo",
                  in: {
                    profileImgUrl: "$$contactInfo.photo",
                  },
                },
              },
              0,
            ],
          },
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
