import connectMongo from "@/app/lib/constants/mongodb";
import ChatMessages from "@/app/lib/models/chatMessages.model";
import { getUserIdFromToken } from "@/app/lib/utils/getUserIdFromToken";

import { NextResponse } from "next/server";

// Handler for storing a new chat message
export async function POST(request: Request) {
  try {
    const { userId: loggedInUserId } = getUserIdFromToken();

    if (!loggedInUserId) {
      return NextResponse.json(
        { message: "User ID is required", error: true },
        { status: 400 }
      );
    }
    // Parse the incoming request body
    const { senderId, receiverId, message } = await request.json();

    // Validate required fields
    if (!senderId || !receiverId || !message) {
      return NextResponse.json(
        {
          message: "interestId, senderId, receiverId, and message are required",
          error: true,
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Create a new chat message
    const newMessage = new ChatMessages({
      senderId,
      receiverId, // Include receiverId
      message,
    });

    // Save the message to the database
    await newMessage.save();

    return NextResponse.json(
      {
        message: "Message sent successfully",
        data: newMessage,
        error: false,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error storing message:", error);
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

// Handler for fetching chat messages by userId
export async function GET(request: Request) {
  const url = new URL(request.url);
  const chatUserId = url.searchParams.get("chatUserId");
  const { userId: loggedInUserId } = getUserIdFromToken();
  console.log("loggedInUserId", loggedInUserId);

  // Validate required fields
  if (!loggedInUserId || !chatUserId) {
    return NextResponse.json(
      { message: "userId or chatUserId is required", error: true },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Query for messages where the user is either sender or receiver
    const messages = await ChatMessages.find({
      $or: [
        { senderId: loggedInUserId, receiverId: chatUserId },
        { senderId: chatUserId, receiverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 }); // Sort by createdAt in ascending order (oldest to newest)

    return NextResponse.json(
      {
        message: "Messages fetched successfully",
        data: messages,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching messages:", error);
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
