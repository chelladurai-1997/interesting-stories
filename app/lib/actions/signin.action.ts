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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
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

    // Set the login cookie (valid for 1 hour)
    const cookieExpirationTime = 60 * 60; // 1 hour in seconds
    cookies().set({
      name: "sessionToken", // You can name it "sessionToken" or something similar
      value: data.userId, // Store the user ID or session token
      maxAge: cookieExpirationTime, // Expiration time (1 hour)
      path: "/", // Set to "/" to make the cookie available to all routes
      httpOnly: true, // Make cookie accessible only by the server (for security)
      secure: true, // Use secure cookies in production (HTTPS)
    });

    // Return successful response
    return {
      message: data.message,
      error: false,
      accessToken: data.accessToken,
      userId: data.userId,
      userName: data.userName,
    };
  } catch (error) {
    console.error("Error during sign in:", error);
    return { message: "Something went wrong!", error: true };
  }
}
