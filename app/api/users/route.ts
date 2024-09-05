import bcrypt from "bcrypt";
import connectMongo from "@/app/lib/constants/mongodb";
import User from "@/app/lib/models/user.model";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// Helper function for error handling
const handleError = (res: NextApiResponse, error: any) => {
  return res.status(500).json({
    error: "Internal Server Error",
    details: process.env.NODE_ENV === "development" ? error.message : undefined, // Avoid leaking error details in production
  });
};

// Secure JSON response with the correct headers
const secureJsonResponse = (data: any, statusCode: number = 200) => {
  return NextResponse.json(data, {
    status: statusCode,
    headers: {
      "Content-Security-Policy": "default-src 'self'", // Example CSP header
      "X-Content-Type-Options": "nosniff", // Prevent MIME type sniffing
      "Referrer-Policy": "no-referrer", // Improve privacy
      "X-XSS-Protection": "1; mode=block", // XSS protection
    },
  });
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    const users = await User.find().select("-password -__v"); // Exclude sensitive fields
    return secureJsonResponse({ data: users });
  } catch (error) {
    return handleError(res, error);
  }
}

export async function POST(req: Request, res: NextApiResponse) {
  await connectMongo();

  if (req.method === "POST") {
    try {
      const { username, password, mobile, email, agreeToTermsAndConditions } =
        await req.json();

      // Input validation
      if (
        !username ||
        !password ||
        !mobile ||
        !email ||
        agreeToTermsAndConditions === undefined
      ) {
        return secureJsonResponse({ error: "Missing required fields" }, 400);
      }

      // Check for existing user (prevent duplicate entries)
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return secureJsonResponse(
          { error: "User with this email already exists" },
          409
        );
      }

      // Sanitize input (consider using a library like DOMPurify)
      const sanitizedUsername = username.trim();
      const sanitizedEmail = email.toLowerCase().trim();

      // Hash the password before saving
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user
      const newUser = new User({
        username: sanitizedUsername,
        password: hashedPassword, // Store hashed password
        mobile,
        email: sanitizedEmail,
        agreeToTermsAndConditions,
      });

      // Save the user to the database
      await newUser.save();

      // Return the created user without sensitive fields
      const userResponse = newUser.toJSON();
      delete userResponse._id; // Optionally hide the _id
      delete userResponse.password; // Remove password from the response

      return secureJsonResponse(userResponse, 201);
    } catch (error) {
      return handleError(res, error);
    }
  } else {
    return secureJsonResponse({ error: "Method not allowed" }, 405);
  }
}
