"use server";

import { cookies } from "next/headers";

export async function getAccessTokenFromHeaders() {
  try {
    // Read the access token from the Authorization header or cookie (depends on implementation)
    const accessToken = cookies().get("accessToken")?.value;
    if (!accessToken) {
      return { message: "Access token not found", error: true };
    }

    // Return the access token
    return { accessToken, message: "Access token retrieved", error: false };
  } catch (error) {
    console.error("Error fetching access token:", error);
    return { message: "Failed to retrieve access token", error: true };
  }
}
