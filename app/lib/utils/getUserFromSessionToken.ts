import { cookies } from "next/headers";
import User from "@/app/lib/models/user.model";
import connectMongo from "@/app/lib/constants/mongodb";

export async function getUserFromSessionToken(): Promise<{
  userId: string | null;
  error: string | null;
}> {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Read the token from cookies
    const cookieStore = cookies();
    const userId = cookieStore.get("sessionToken")?.value;

    if (!userId) {
      return { userId: null, error: "Unauthorized: No session token found" };
    }

    // Find the user by userId (make sure the user exists)
    const user = await User.findById(userId);

    if (!user) {
      return { userId: null, error: "User not found" };
    }

    // Return the user if found
    return { userId, error: null };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { userId: null, error: "Something went wrong" };
  }
}
