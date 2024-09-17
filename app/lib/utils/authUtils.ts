// app/lib/utils/authUtils.ts
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/app/lib/models/user.model";
import { HydratedDocument } from "mongoose";

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
export function generateAccessToken(user: { _id: string }): string {
  return jwt.sign({ userId: user._id }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRATION!,
  });
}

// Function to generate refresh token
export function generateRefreshToken(user: {
  _id: string;
  username: string;
}): string {
  return jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION! }
  );
}

// Function to verify if the token is expired and valid
export function verifyToken(
  token: string,
  secret: string
): { isValid: boolean; payload?: { userId: string }; message?: string } {
  try {
    const payload = jwt.verify(
      token,
      // secret ? secret : process.env.JWT_ACCESS_SECRET!
      secret
    ) as jwt.JwtPayload;

    const userId = payload.userId as string;

    return { isValid: true, payload: { userId } };
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
