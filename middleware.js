import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login";

  // In development, check localStorage instead of cookies
  const hasToken = request.cookies.get("rocky_crm_token")?.value;
  const isAuthenticated = !!hasToken;

  // If we're on the login page and authenticated, redirect to dashboard
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If we're not on a public path and not authenticated, redirect to login
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Update matcher to exclude more static paths
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|sw.js|workbox-*.js|worker-*.js).*)",
  ],
};
