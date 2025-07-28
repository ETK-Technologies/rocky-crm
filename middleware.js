import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get the token from localStorage (will be null on server)
  const isPublicPath = path === "/login";

  // Check if we're on the client side
  const isClient = typeof window !== "undefined";
  if (!isClient) return NextResponse.next();

  // If we're in development, allow all routes
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next();
  }

  const token = localStorage.getItem("rocky_crm_token");
  const isAuthenticated = !!token;

  // Redirect to login if accessing protected route without auth
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to dashboard if accessing login while authenticated
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
