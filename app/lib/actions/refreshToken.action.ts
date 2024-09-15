"use server";

import { cookies } from "next/headers";

export async function refreshAccessToken() {
  try {
    // Get the refresh token from cookies
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken"); // Adjust if using a different cookie name

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
    const cookieExpirationTime = 60 * 60; // 1 hour in seconds
    cookies().set({
      name: "accessToken",
      value: data.accessToken, // Store the new access token
      maxAge: cookieExpirationTime,
      path: "/",
      httpOnly: true,
      secure: true,
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
