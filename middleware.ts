import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the middleware function
export function middleware(req: NextRequest) {
  // Get the sessionToken from the cookies
  const sessionToken = req.cookies.get("sessionToken")?.value;

  // Clone the URL to modify for redirecting
  const url = req.nextUrl.clone();

  // If the sessionToken is missing, redirect to the login page
  if (!sessionToken) {
    url.pathname = "/login"; // Define the route to redirect to
    return NextResponse.redirect(url);
  }

  // If the token exists, allow the request to continue
  return NextResponse.next();
}

// Define the routes where the middleware will apply
export const config = {
  matcher: ["/profile-info/:path*", "/dashboard"], // Apply middleware to protected routes
};
