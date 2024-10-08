import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, verifyToken } from "@/app/lib/utils/authUtils";

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const data = await request.json();
    const refreshToken = data?.refreshToken;

    // Check if the refresh token is provided
    if (!refreshToken) {
      return NextResponse.json(
        { message: "No refresh token provided" },
        { status: 401 } // Unauthorized status code
      );
    }

    // Verify the refresh token using the secret
    const user = verifyToken(refreshToken, JWT_REFRESH_SECRET!);

    // If the token is not valid or expired, return an error
    if (!user.isValid) {
      return NextResponse.json(
        { message: user.message || "Invalid or expired refresh token" },
        { status: 401 } // Unauthorized status code
      );
    }

    // Generate a new access token using the user ID from the payload
    const newAccessToken = generateAccessToken({ _id: user.payload?.userId! });

    // Return the new access token as a JSON response
    return NextResponse.json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken, // New access token sent to client
    });
  } catch (error) {
    console.error("Error refreshing token:", error);

    // Catch any errors and return a generic error message with status 500 (Internal Server Error)
    return NextResponse.json(
      { message: "Internal server error occurred" },
      { status: 500 } // Internal Server Error
    );
  }
}
