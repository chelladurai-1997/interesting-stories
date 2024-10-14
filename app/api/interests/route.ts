import connectMongo from "@/app/lib/constants/mongodb";
import { NextResponse } from "next/server";
import Interests, {
  IInterest,
  InterestStatus,
} from "@/app/lib/models/interest.model";
import { handleServerError } from "@/app/lib/utils/handleServerError";

// Handler for creating or updating an interest
export async function POST(request: Request) {
  const { senderId, receiverId, status } = await request.json();

  try {
    // Connect to MongoDB
    await connectMongo();

    // Ensure senderId and receiverId are provided
    if (!senderId || !receiverId) {
      return NextResponse.json(
        { message: "senderId and receiverId are required", error: true },
        { status: 400 }
      );
    }

    // Check for existing interest between the users
    const existingInterest = await Interests.findOne({
      $or: [
        { senderId, receiverId }, // Current user sent interest
        { senderId: receiverId, receiverId: senderId }, // Receiver sent interest to current user
      ],
    });

    // If an existing interest is found
    if (existingInterest) {
      // Check if duplicate operation for the same status on existing record
      if (
        existingInterest.senderId.equals(senderId) &&
        existingInterest.status === status
      ) {
        return NextResponse.json(
          {
            message: "You have already done this!",
            error: true,
          },
          { status: 400 }
        );
      }

      // Check if the existing interest was sent by the current user and has been declined
      if (
        existingInterest.senderId.equals(senderId) &&
        existingInterest.status === InterestStatus.REJECTED
      ) {
        return NextResponse.json(
          {
            message:
              "You cannot send interest to this user because your previous interest was declined.",
            error: true,
          },
          { status: 400 }
        );
      }

      // If user re-consider after declined previously
      if (
        status === InterestStatus.ACCEPTED &&
        existingInterest.receiverId.equals(senderId) &&
        existingInterest.status === InterestStatus.REJECTED
      ) {
        existingInterest.status = InterestStatus.ACCEPTED;
        await existingInterest.save();

        return NextResponse.json(
          {
            message: "re-considered  success and connection is established",
            data: existingInterest,
            error: false,
          },
          { status: 200 }
        );
      }

      // If the current user is the sender and wants to reject the interest
      if (
        status === InterestStatus.REJECTED &&
        existingInterest.receiverId.equals(senderId)
      ) {
        // Update the existing interest's status to 'REJECTED'
        existingInterest.status = InterestStatus.REJECTED;
        await existingInterest.save();

        return NextResponse.json(
          {
            message: "Interest rejected successfully.",
            data: existingInterest,
            error: false,
          },
          { status: 200 }
        );
      }

      // Mutual interest case where receiver also sent interest to sender
      if (
        existingInterest.senderId.equals(receiverId) &&
        existingInterest.receiverId.equals(senderId) &&
        existingInterest.status === InterestStatus.PENDING
      ) {
        // Update the existing interest's status to 'accepted' when both users send interest
        existingInterest.status = InterestStatus.ACCEPTED;
        await existingInterest.save();

        return NextResponse.json(
          {
            message: "Mutual interest accepted!",
            data: existingInterest,
            error: false,
          },
          { status: 200 }
        );
      }

      // If there's already an interest in progress (pending), do not allow another pending interest
      return NextResponse.json(
        { message: "Interest already exists between these users", error: true },
        { status: 409 } // Use 409 Conflict for existing pending interests
      );
    }

    // If no existing interest found, create a new interest
    const newInterest: IInterest = new Interests({
      senderId,
      receiverId,
      status: status || InterestStatus.PENDING, // Default to PENDING if status not provided
    });

    // Save the new interest to the database
    const savedInterest = await newInterest.save();

    return NextResponse.json(
      {
        message: "Interest sent successfully",
        data: savedInterest,
        error: false,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}

// Handler for fetching interests
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId"); // Extract userId from query parameters

  // Ensure userId is provided
  if (!userId) {
    return NextResponse.json(
      { message: "userId is required", error: true },
      { status: 400 }
    );
  }

  try {
    // Connect to MongoDB
    await connectMongo();

    // Query for both sent and received interests for the user
    const interests = await Interests.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    });

    // Return the fetched interests
    return NextResponse.json(
      {
        message: "Interests fetched successfully",
        data: interests,
        error: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleServerError(error);
  }
}
