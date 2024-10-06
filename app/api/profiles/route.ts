import connectMongo from "@/app/lib/constants/mongodb";
import BasicInformation from "@/app/lib/models/basicinfo.model";
import ContactInfo from "@/app/lib/models/contactInfo.model";
import EducationOccupation from "@/app/lib/models/educationOccupation.model";
import FamilyDetails from "@/app/lib/models/familyInfo.model";
import HoroscopeInfo from "@/app/lib/models/horoscopeInfo.model";
import PersonalDetails from "@/app/lib/models/personalInfo.model";
import User from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";
import { Types, PipelineStage } from "mongoose"; // Import for handling ObjectId conversions

// Define interfaces for request parameters and response
interface PaginationParameters {
  page: number; // Current page number
  limit: number; // Number of items per page
}
interface DefaultFilter {
  adminApproved?: boolean; // Optional filter for admin approval
}

interface FilterCriteria {
  filter: {
    adminApproved: boolean; // Filter for admin-approved users
    [key: string]: any; // Allow other filter properties
  };
  gender?: string; // Optional gender filter
  maritalStatus?: string; // Optional marital status filter
  occupation?: string; // Optional occupation filter
  state?: string; // Optional state filter
  district?: string; // Optional district filter
}

interface UserProfileResponse {
  message: string; // Response message
  data: any[]; // User profile data
  page: number; // Current page number
  limit: number; // Number of items per page
  error: boolean; // Error status
}

// Helper function to extract pagination parameters from the URL
function getPaginationParameters(url: URL): PaginationParameters {
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "10", 10);
  return { page, limit }; // Return pagination parameters
}

// Function to calculate age date range
function calculateAgeDateRange(age: string | null): [Date | null, Date | null] {
  if (!age) return [null, null]; // Return null dates if age is not provided
  const [minAge, maxAge] = age.split("-").map(Number);
  const currentDate = new Date();
  const maxAgeDate = new Date(
    currentDate.getFullYear() - minAge,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const minAgeDate = new Date(
    currentDate.getFullYear() - maxAge,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  return [minAgeDate, maxAgeDate]; // Return the calculated age range
}

// Function to build filter criteria from URL parameters
function buildFilters(url: URL): FilterCriteria {
  const userIds = url.searchParams.get("userIds");
  const gender = url.searchParams.get("gender") || undefined; // Explicitly convert null to undefined
  const maritalStatus = url.searchParams.get("marital_status") || undefined; // Explicitly convert null to undefined
  const occupation = url.searchParams.get("occupation") || undefined; // Explicitly convert null to undefined
  const state = url.searchParams.get("state") || undefined; // Explicitly convert null to undefined
  const district = url.searchParams.get("district") || undefined; // Explicitly convert null to undefined

  const filter: any = { adminApproved: true }; // Default filter for admin-approved users

  // Include user IDs in the filter if provided
  if (userIds) {
    filter._id = {
      $in: userIds.split(",").map((id) => new Types.ObjectId(id.trim())),
    };
  }

  return { filter, gender, maritalStatus, occupation, state, district }; // Return the filter criteria
}

// Function to build the aggregation pipeline for MongoDB
function buildAggregationPipeline(
  filters: FilterCriteria,
  minAgeDate: Date | null,
  maxAgeDate: Date | null,
  url: URL
): PipelineStage[] {
  const { filter, gender, maritalStatus, occupation, state, district } =
    filters;

  const pipeline: PipelineStage[] = [
    { $match: filter }, // Match users based on the filters
    {
      $lookup: {
        from: BasicInformation.collection.name,
        localField: "_id",
        foreignField: "userId",
        as: "basicInformation", // Join basic information
      },
    },
    { $unwind: "$basicInformation" }, // Ensure basic information exists
    ...(maritalStatus
      ? [{ $match: { "basicInformation.marital_status": maritalStatus } }]
      : []),
    ...(minAgeDate && maxAgeDate
      ? [
          {
            $match: {
              "basicInformation.dob": { $gte: minAgeDate, $lte: maxAgeDate }, // Match age range
            },
          },
        ]
      : []),
    ...(gender ? [{ $match: { "basicInformation.gender": gender } }] : []),
    {
      $lookup: {
        from: PersonalDetails.collection.name,
        localField: "_id",
        foreignField: "userId",
        as: "personalInfo", // Join personal information
      },
    },
    { $unwind: { path: "$personalInfo", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: EducationOccupation.collection.name,
        localField: "_id",
        foreignField: "userId",
        as: "educationOccupation", // Join education and occupation information
      },
    },
    {
      $unwind: {
        path: "$educationOccupation",
        preserveNullAndEmptyArrays: true,
      },
    },
    ...(occupation
      ? [{ $match: { "educationOccupation.occupation": occupation } }]
      : []),
    {
      $lookup: {
        from: FamilyDetails.collection.name,
        localField: "_id",
        foreignField: "userId",
        as: "familyDetails", // Join family details
      },
    },
    { $unwind: { path: "$familyDetails", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: ContactInfo.collection.name,
        localField: "_id",
        foreignField: "userId",
        as: "contactInfo", // Join contact information
      },
    },
    { $unwind: { path: "$contactInfo", preserveNullAndEmptyArrays: true } },
    ...(state ? [{ $match: { "contactInfo.state": state } }] : []),
    ...(district ? [{ $match: { "contactInfo.district": district } }] : []),
    {
      $lookup: {
        from: HoroscopeInfo.collection.name,
        localField: "_id",
        foreignField: "userId",
        as: "horoscopeInfo", // Join horoscope information
      },
    },
    { $unwind: { path: "$horoscopeInfo", preserveNullAndEmptyArrays: true } },
    ...(url.searchParams.get("dhosam")
      ? [{ $match: { "horoscopeInfo.dhosam": url.searchParams.get("dhosam") } }]
      : []),
    {
      $project: {
        _id: 0, // Exclude _id from the output
        userId: "$_id",
        name: "$basicInformation.name",
        dob: "$basicInformation.dob",
        gender: "$basicInformation.gender",
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
          state: "$contactInfo.state",
          district: "$contactInfo.district",
        },
        "horoscopeInfo.dhosam": 1,
      },
    },
    {
      $skip:
        (parseInt(url.searchParams.get("page") || "1", 10) - 1) *
        parseInt(url.searchParams.get("limit") || "10", 10), // Skip documents for pagination
    },
    { $limit: parseInt(url.searchParams.get("limit") || "10", 10) }, // Limit documents to specified count
  ];

  return pipeline; // Return the constructed pipeline
}

// Handler for fetching paginated or specific user profiles
export async function GET(
  request: Request
): Promise<NextResponse<UserProfileResponse>> {
  const url = new URL(request.url);
  const { page, limit } = getPaginationParameters(url); // Get pagination parameters
  const filters = buildFilters(url); // Build filters from URL
  const [minAgeDate, maxAgeDate] = calculateAgeDateRange(
    url.searchParams.get("age") // Calculate age date range from query parameter
  );

  try {
    await connectMongo(); // Connect to MongoDB

    const profiles = await User.aggregate(
      buildAggregationPipeline(filters, minAgeDate, maxAgeDate, url) // Execute aggregation pipeline
    );

    return NextResponse.json({
      message: "Profiles fetched successfully",
      data: profiles,
      page,
      limit,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    // Return a structured error response
    return NextResponse.json({
      message: errorMessage,
      data: [],
      page,
      limit,
      error: true,
    });
  }
}
