import connectMongo from "@/app/lib/constants/mongodb";
import User from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";

// Handler for fetching users pending approval
export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Query to fetch users pending approval
    const pendingUsers = await User.find({ adminApproved: false }).select(
      "_id username mobile completedSections"
    );

    // Return the pending users
    return NextResponse.json({
      message: "Pending users fetched successfully",
      data: pendingUsers,
      error: false,
    });
  } catch (error) {
    console.error("Error fetching pending users:", error);

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
