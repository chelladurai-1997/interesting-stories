import { verifyToken } from "./authUtils";
import { extractTokenFromHeader } from "./extractTokenFromHeader";

export const getUserIdFromToken = (): {
  userId: string | null;
  message: string;
  error: boolean;
} => {
  // Extract the token from the header
  const { token, error } = extractTokenFromHeader();

  // If there's an error or no token, return an object with error details
  if (error || !token) {
    return { userId: null, message: error || "Unauthorized", error: true };
  }

  // Verify the token
  const { isValid, payload, message } = verifyToken(
    token,
    process.env.JWT_ACCESS_SECRET!
  );

  // If the token is invalid or userId is missing, return an object with error details
  if (!isValid || !payload?.userId) {
    return { userId: null, message: message || "User not found", error: true };
  }

  // If everything is fine, return the userId
  return { userId: payload.userId, message: "success", error: false };
};
