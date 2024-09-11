"use server";

import { cookies } from "next/headers";

export async function onSignUpFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  try {
    const username = formData.get("name")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const mobile = formData.get("mobileNo")?.toString().trim();
    const agree = formData.get("agree") === "on";

    if (!username || !password || !mobile || !agree) {
      return { message: "Invalid form submission", error: true };
    }

    // Build the absolute URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const apiUrl = `${baseUrl}/api/auth/signup`;

    // Call the signup API using the absolute URL
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        password,
        mobileNo: mobile,
        agree,
      }),
    });

    // Parse the response
    const data = await response.json();

    if (!response.ok) {
      return { message: data.message || "Signup failed", error: true };
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

    // Return success response with user data
    return {
      message: "success",
      error: false,
      userId: data.userId,
      userName: data.userName,
    };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { message: "Something went wrong!", error: true };
  }
}
