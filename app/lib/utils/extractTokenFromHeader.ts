// utils/extractTokenFromHeader.ts

import { headers } from "next/headers";

/**
 * Extracts the Bearer token from the Authorization header.
 *
 * @returns An object containing the token and any potential error messages.
 */
export function extractTokenFromHeader(): { token?: string; error?: string } {
  // Get headers using the 'headers' utility
  const headersList = headers();
  const authHeader = headersList.get("Authorization");

  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized: Bearer token is missing or invalid" };
  }

  // Extract the token part
  const token = authHeader.split(" ")[1];

  return { token };
}
