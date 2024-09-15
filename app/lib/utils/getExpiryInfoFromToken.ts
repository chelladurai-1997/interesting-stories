import { jwtDecode } from "jwt-decode";

interface JWTDecoded {
  exp: number; // The expiry time in seconds
}

export const getExpiryTimeFromToken = (token: string): number | null => {
  try {
    // Decode the JWT to get the payload
    const decodedToken: JWTDecoded = jwtDecode(token);
    // JWT expiry time is in seconds, so multiply by 1000 to convert to milliseconds
    const expiryTime = decodedToken.exp * 1000;

    return expiryTime;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
