import connectMongo from "@/app/lib/constants/mongodb";
import User from "@/app/lib/models/user.model";
import { NextResponse } from "next/server";
import router from "next/cache";

// Handler for approving or rejecting a user
export async function POST(request: Request) {
  try {
    const { userId, status } = await request.json();

    if (!userId || !["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid request", error: true },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Update user approval status based on the provided status
    const updateData =
      status === "approved"
        ? { adminApproved: true, approvalDate: new Date() }
        : { adminApproved: false, approvalDate: null };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found", error: true },
        { status: 404 }
      );
    }
    router.revalidatePath("/");
    return NextResponse.json({
      message: `User has been ${status}.`,
      error: false,
    });
  } catch (error) {
    console.error("Error updating user status:", error);

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
