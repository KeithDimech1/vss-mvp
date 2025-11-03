import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/api/auth/login', '/api/auth/session', '/api/auth/logout'];

  // Check if the current path is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Get session cookie
  const sessionCookie = request.cookies.get('session');

  // If accessing root, redirect based on auth status
  if (pathname === '/') {
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } else {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If accessing a public route
  if (isPublicRoute) {
    // If already authenticated and trying to access login, redirect to dashboard
    if (sessionCookie && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // For protected routes, check authentication
  if (!sessionCookie) {
    // Not authenticated, redirect to login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Authenticated, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
