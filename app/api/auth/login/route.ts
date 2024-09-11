// app/api/auth/login/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  generateAccessToken,
  generateRefreshToken,
} from "@/app/lib/utils/authUtils";
import connectMongo from "@/app/lib/constants/mongodb";

// Define type for the login request body
interface LoginRequestBody {
  mobileNo: string;
  password: string;
}

// POST handler for login
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body
    const { mobileNo, password }: LoginRequestBody = await request.json();

    // Validate the request body
    if (!mobileNo || !password) {
      return NextResponse.json(
        { message: "Invalid form submission" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongo();

    // Authenticate the user
    const authResult = await authenticateUser(mobileNo, password);
    if (authResult.error || !authResult.user) {
      return NextResponse.json(
        { message: authResult.message },
        { status: 401 }
      );
    }

    const user = authResult.user; // User is guaranteed to be non-null

    // Generate access and refresh tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user); // This will be implemented post R1.0

    // Create a response and set the refresh token in an HttpOnly cookie
    const response = NextResponse.json({
      message: "success",
      accessToken,
      userId: user._id.toString(),
      userName: user.username,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true, // Prevents client-side access
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      secure: true, // Use secure cookies in production
      sameSite: "strict", // Prevents CSRF attacks
    });

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
