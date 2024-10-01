import connectMongo from "@/app/lib/constants/mongodb";

import { NextResponse } from "next/server";
import Interests, {
  IInterest,
  InterestStatus,
} from "@/app/lib/models/interest.model";

// Handler for creating a new interest
export async function POST(request: Request) {
  const { senderId, receiverId, status } = await request.json();

  try {
    // Connect to MongoDB
    await connectMongo();

    // Create a new interest with default status if not provided
    const newInterest: IInterest = new Interests({
      senderId,
      receiverId,
      status: status || InterestStatus.PENDING,
    });

    // Save the interest to the database
    const savedInterest = await newInterest.save();

    return NextResponse.json(
      {
        message: "Interest updated successfully",
        data: savedInterest,
        error: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error sending interest:", error);
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

    // Query for both sent and received interests
    const interests = await Interests.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    return NextResponse.json(
      {
        message: "Interests fetched successfully",
        data: interests,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching interests:", error);
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
