// app/api/auth/signup/route.ts
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user.model";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/app/lib/utils/authUtils";
import connectMongo from "@/app/lib/constants/mongodb";

// POST handler for user signup
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const {
      name,
      password,
      mobileNo,
      agree,
    }: { name: string; password: string; mobileNo: string; agree: string } =
      await request.json();

    // Validate request
    if (!name || !password || !mobileNo || agree !== "on") {
      return NextResponse.json(
        { message: "Invalid form submission" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Check if the mobile number is already registered
    const existingUser = await User.findOne({ mobile: mobileNo });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this mobile number already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username: name,
      password: hashedPassword,
      mobile: mobileNo,
      agreeToTermsAndConditions: true,
    });

    const savedUser = await newUser.save();

    // Use utility functions to generate access and refresh tokens
    const accessToken = generateAccessToken(savedUser);
    const refreshToken = generateRefreshToken(savedUser);

    // Create the response object
    const response = NextResponse.json({
      message: "success",
      accessToken,
      refreshToken,
      userId: savedUser._id.toString(),
      userName: savedUser.username,
    });

    // Set refresh token as HttpOnly cookie
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    // Set access token as HttpOnly cookie
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60, // 15 minutes
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
