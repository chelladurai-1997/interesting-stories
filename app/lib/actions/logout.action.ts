"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// Logout function to clear the cookies
export async function handleLogout() {
  try {
    // Delete the refreshToken cookie
    cookies().delete("refreshToken");

    // Delete the accessToken cookie
    cookies().delete("accessToken");

    revalidatePath("/", "layout");

    return { message: "Logout successful", error: false };
  } catch (error) {
    console.error("Error during logout:", error);
    return { message: "Something went wrong during logout!", error: true };
  }
}
