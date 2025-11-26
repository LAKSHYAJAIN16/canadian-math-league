import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for an admin route
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Get the token from the cookies
    const token = request.cookies.get('adminToken')?.value;
    
    // If there's no token, redirect to the login page
    if (!token) {
      const loginUrl = new URL('/admin/secret/create', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // In a real app, you would verify the token here
    // For now, we'll just check if it exists
    if (!token) {
      const loginUrl = new URL('/admin/secret/create', request.url);
      loginUrl.searchParams.set('error', 'invalid_token');
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    // Add other protected paths here
  ],
};
