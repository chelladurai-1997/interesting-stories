import connectMongo from "@/app/lib/constants/mongodb";
import RecentVisitors, {
  IRecentVisitor,
} from "@/app/lib/models/recentvisitors.model";
import { NextResponse } from "next/server";

// Handler for creating or updating a recent visitor
export async function POST(request: Request) {
  const { visitorId, profileOwnerId } = await request.json();

  try {
    // Connect to MongoDB
    await connectMongo();

    // Check if the visitor has already visited this profile
    const existingVisit = await RecentVisitors.findOne({
      visitorId,
      profileOwnerId,
    });

    if (existingVisit) {
      // If a visit is found, update the visitedAt timestamp
      existingVisit.visitedAt = new Date();
      const updatedVisit = await existingVisit.save();

      return NextResponse.json(
        {
          message: "Visit updated successfully",
          data: updatedVisit,
          error: false,
        },
        { status: 200 }
      );
    }

    // If no visit is found, create a new visitor entry
    const newVisit: IRecentVisitor = new RecentVisitors({
      visitorId,
      profileOwnerId,
      visitedAt: new Date(), // Set the current date as visitedAt
    });

    // Save the new visit to the database
    const savedVisit = await newVisit.save();

    return NextResponse.json(
      {
        message: "Visit created successfully",
        data: savedVisit,
        error: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error handling visit:", error);
    let errorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      errorMessage = error.message.includes("MongoError")
        ? "Database error occurred."
        : error.message;
    }

    return NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );
  }
}

// Handler for fetching recent visitors
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { message: "userId is required", error: true },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Query for recent visitors to the user's profile
    const visitors = await RecentVisitors.find({
      profileOwnerId: userId,
    }).sort({ visitedAt: -1 }); // Sort by visitedAt in descending order

    return NextResponse.json(
      {
        message: "Recent visitors fetched successfully",
        data: visitors,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching recent visitors:", error);
    let errorMessage = "An unknown error occurred.";

    if (error instanceof Error) {
      errorMessage = error.message.includes("MongoError")
        ? "Database error occurred."
        : error.message;
    }

    return NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );
  }
}
