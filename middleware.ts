import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the middleware function
export function middleware(req: NextRequest) {
  // Get the accessToken from the cookies
  const accessToken = req.cookies.get("accessToken")?.value;

  // Clone the URL to modify for redirecting
  const url = req.nextUrl.clone();

  // If the accessToken is missing, redirect to the login page
  if (!accessToken) {
    url.pathname = "/login"; // Define the route to redirect to
    return NextResponse.redirect(url);
  }

  // If the accessToken exists, clone the request and add Authorization header
  const authHeader = `Bearer ${accessToken}`;

  // Create a new request with the Authorization header
  const modifiedReq = new Request(req.url, {
    headers: new Headers({
      ...Object.fromEntries(req.headers.entries()), // Preserve other headers
      Authorization: authHeader, // Add Authorization header
    }),
    method: req.method,
    body: req.body,
    credentials: "same-origin", // Preserve credentials (cookies, headers, etc.)
  });

  // Allow the request to continue with the modified headers
  return NextResponse.next({
    request: modifiedReq,
  });
}

// Define the routes where the middleware will apply
export const config = {
  matcher: ["/profile-info/:path*", "/dashboard"], // Apply middleware to protected routes
};
