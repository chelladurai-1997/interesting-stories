// app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/lib/utils/authUtils";
import connectMongo from "@/app/lib/constants/mongodb";

// POST handler for user login
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const { mobileNo, password }: { mobileNo: string; password: string } =
      await request.json();

    // Validate request
    if (!mobileNo || !password) {
      return NextResponse.json(
        { message: "Invalid login credentials" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Find the user by mobile number
    const existingUser = await User.findOne({ mobile: mobileNo });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User with this mobile number does not exist" },
        { status: 400 }
      );
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(existingUser);
    const refreshToken = generateRefreshToken(existingUser);

    // Create the response object
    const response = NextResponse.json({
      message: "success",
      accessToken,
      refreshToken,
      userId: existingUser._id.toString(),
      userName: existingUser.username,
      completedSections: existingUser?.completedSections,
    });

    // Enable below blocks when this endpoint is exposed as endpoint outside nextjs project

    // Set refresh token as HttpOnly cookie (if needed)
    // response.cookies.set("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 7 * 24 * 60 * 60, // 7 days
    //   path: "/",
    //   secure: true,
    //   sameSite: "strict",
    // });

    // Set access token as HttpOnly cookie
    // response.cookies.set("accessToken", accessToken, {
    //   httpOnly: true,
    //   maxAge: 15 * 60, // 15 minutes
    //   path: "/",
    //   secure: true,
    //   sameSite: "strict",
    // });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
