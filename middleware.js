import { NextResponse } from 'next/server';

export function middleware(request) {
  // Skip middleware in development mode
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }

  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login';

  // Get auth token from cookie
  const authToken = request.cookies.get('rocky_crm_token')?.value;
  const isAuthenticated = !!authToken;

  // Redirect authenticated users trying to access login page
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users trying to access protected pages
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Update matcher to exclude more static paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|sw.js|workbox-*.js|worker-*.js).*)',
  ],
};
