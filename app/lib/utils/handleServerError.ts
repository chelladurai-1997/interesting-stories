import { NextResponse } from "next/server";
import { MongoError } from "mongodb";

const GENERIC_ERROR_MESSAGE = "An unknown error occurred.";

export function handleServerError(
  error: unknown,
  customMessage = GENERIC_ERROR_MESSAGE
) {
  let errorMessage = customMessage;
  let statusCode = 500;

  // Check if error is an instance of JavaScript Error
  if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    // Fallback if error is not an instance of Error
    errorMessage = GENERIC_ERROR_MESSAGE;
  }

  // Handle MongoDB errors
  if (error instanceof MongoError && error.code !== undefined) {
    switch (error.code) {
      case 11000: // Duplicate key error
        errorMessage = "Duplicate entry found.";
        statusCode = 409;
        break;
      case 121: // Document validation error
        errorMessage = "Document validation failed.";
        statusCode = 400;
        break;
      default:
        errorMessage = "Database error occurred.";
    }
  }

  // Log the detailed error for server-side debugging
  console.error("Error:", error);

  // Return a generic message to the client with a status code
  return NextResponse.json(
    { message: errorMessage, error: true },
    { status: statusCode }
  );
}
