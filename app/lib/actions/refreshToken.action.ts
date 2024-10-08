"use server";

import { cookies } from "next/headers";

export async function refreshAccessTokenAction() {
  try {
    // Get the refresh token from cookies
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return { message: "No refresh token found", error: true };
    }

    // Build the absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = `${baseUrl}/api/auth/refresh-token`;

    // Send a POST request to the refresh token API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors
      return {
        message: data.message || "Failed to refresh token",
        error: true,
      };
    }

    // Update the access token cookie
    const accessTokenExpirationTime = 15 * 60; // 15 minutes in seconds
    cookies().set({
      name: "accessToken",
      value: data.accessToken,
      maxAge: accessTokenExpirationTime, // 15 minutes
      path: "/",
      httpOnly: true, // Accessible only by the server (for security)
      secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
      sameSite: "strict", // Prevent CSRF attacks
    });

    // Return successful response
    return {
      message: "Token refreshed successfully",
      error: false,
      accessToken: data.accessToken,
      userId: data.userId,
    };
  } catch (error) {
    console.error("Error during token refresh:", error);
    return { message: "Something went wrong!", error: true };
  }
}
