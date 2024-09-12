// app/lib/utils/authUtils.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user.model";
import { HydratedDocument } from "mongoose";

// Environment variables for JWT secrets and expiration
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "JWT_ACCESS_SECRET";
const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "JWT_REFRESH_SECRET";
const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION || "15m";
const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION || "7d";

// User Interface (extend with your User model's properties)
interface UserDocument {
  _id: string;
  username: string;
  password: string;
  mobile: string;
}

// Function to authenticate user
export async function authenticateUser(
  mobileNo: string,
  password: string
): Promise<{
  user: HydratedDocument<UserDocument> | null;
  message: string;
  error: boolean;
}> {
  const user = await User.findOne({ mobile: mobileNo });
  if (!user) {
    return {
      user: null,
      message: "Sorry, The user you're looking for doesn't exist.",
      error: true,
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return {
      user: null,
      message:
        "It looks like something went wrong with your login. Double-check your info and give it another shot! 🔍",
      error: true,
    };
  }

  return { user, message: "Authenticated", error: false };
}

// Function to generate access token
export function generateAccessToken(
  user: HydratedDocument<UserDocument>
): string {
  return jwt.sign(
    { userId: user._id, username: user.username },
    JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );
}

// Function to generate refresh token
export function generateRefreshToken(
  user: HydratedDocument<UserDocument>
): string {
  return jwt.sign(
    { userId: user._id, username: user.username },
    JWT_REFRESH_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRATION }
  );
}

// Function to verify if the token is expired and valid
export function verifyToken(
  token: string,
  secret: string
): { isValid: boolean; payload?: any; message?: string } {
  try {
    const payload = jwt.verify(token, secret);
    return { isValid: true, payload };
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { isValid: false, message: "Token has expired" };
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return { isValid: false, message: "Invalid token" };
    }
    return { isValid: false, message: "Token verification failed" };
  }
}
