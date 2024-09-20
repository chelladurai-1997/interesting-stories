"use server";

import { cookies } from "next/headers";

// POST handler for sign-in
export async function onSignInFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  try {
    const mobile = formData.get("mobileNo")?.toString().trim();
    const password = formData.get("password")?.toString().trim();

    if (!mobile || !password) {
      return { message: "Invalid form submission", error: true };
    }

    // Create request body
    const requestBody = {
      mobileNo: mobile,
      password: password,
    };

    // Build the absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = `${baseUrl}/api/auth/login`;

    // Send a POST request to the login API
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle API errors
      return { message: data.message || "Something went wrong!", error: true };
    }

    // Set the refresh token as HttpOnly cookie (valid for 7 days)
    const refreshTokenExpirationTime = 7 * 24 * 60 * 60; // 7 days in seconds
    if (data.refreshToken) {
      cookies().set({
        name: "refreshToken",
        value: data.refreshToken,
        maxAge: refreshTokenExpirationTime, // 7 days
        path: "/",
        httpOnly: true, // Accessible only by the server (for security)
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production (HTTPS)
        sameSite: "strict", // Prevent CSRF attacks
      });
    }

    // Set the access token as HttpOnly cookie (valid for 15 minutes)
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

    // Return successful response with user details
    return {
      message: data.message,
      error: false,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken, // In case you need to store or log it
      userId: data.userId,
      userName: data.userName,
      completedSections: data?.completedSections,
    };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { message: "Something went wrong!", error: true };
  }
}
