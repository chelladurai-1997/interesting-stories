"use server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import User from "@/app/lib/models/user.model";
import connectMongo from "@/app/lib/constants/mongodb";

export async function onSignUpFormSubmit(
  _prevData: unknown,
  formData: FormData
) {
  try {
    const username = formData.get("name")?.toString().trim();
    const password = formData.get("password")?.toString().trim();
    const mobile = formData.get("mobileNo")?.toString().trim();
    const agreeToTermsAndConditions = formData.get("agree") === "on";

    if (!username || !password || !mobile) {
      return { message: "Invalid form submission", error: true };
    }

    // Connect to MongoDB
    await connectMongo();

    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      mobile,
      agreeToTermsAndConditions,
    });

    // Save the user to the database
    const result = await newUser.save();

    // Set the login cookie (valid for 1 hour)
    const cookieExpirationTime = 60 * 60; // 1 hour in seconds
    cookies().set({
      name: "sessionToken", // You can name it "sessionToken" or something similar
      value: result.toJSON()?.id, // Store the user ID or session token
      maxAge: cookieExpirationTime, // Expiration time (1 hour)
      path: "/", // Set to "/" to make the cookie available to all routes
      httpOnly: true, // Make cookie accessible only by the server (for security)
      secure: true, // Use secure cookies in production (HTTPS)
    });

    return {
      message: "success",
      error: false,
      userId: result.toJSON()?.id,
      userName: result.toJSON()?.username,
    };
  } catch (error) {
    console.error("Error during sign up:", error);
    return { message: "Something went wrong!", error: true };
  }
}
