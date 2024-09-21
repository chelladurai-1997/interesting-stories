import connectMongo from "@/app/lib/constants/mongodb";
import User from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";

// Handler for fetching users pending approval
export async function GET(request: Request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Query to fetch users pending approval
    const pendingUsers = await User.find({
      adminApproved: false,
      isRegistrationComplete: true,
    }).select("_id username mobile completedSections");

    // Create the response with headers to avoid caching
    const response = NextResponse.json({
      message: "Pending users fetched successfully",
      data: pendingUsers,
      error: false,
    });

    // Set headers to prevent caching
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");

    return response;
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

    // Create the error response
    const errorResponse = NextResponse.json(
      { message: errorMessage, error: true },
      { status: 500 }
    );

    // Set headers to prevent caching on error as well
    errorResponse.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    errorResponse.headers.set("Pragma", "no-cache");
    errorResponse.headers.set("Expires", "0");
    errorResponse.headers.set("Surrogate-Control", "no-store");

    return errorResponse;
  }
}
