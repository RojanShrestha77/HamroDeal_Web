import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value;
    const userRole = request.cookies.get('userRole')?.value;

    // Check if the route requires authentication
    const isAuthRoute = pathname.startsWith('/admin') || pathname.startsWith('/user') || pathname.startsWith('/profile');

    if (!isAuthRoute) {
        return NextResponse.next();
    }

    // If no token, redirect to login
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    // Check admin routes
    if (pathname.startsWith('/admin')) {
        if (userRole !== 'admin') {
            const unauthorizedUrl = new URL('/unauthorized', request.url);
            return NextResponse.redirect(unauthorizedUrl);
        }
    }

    // Check user routes (any authenticated user can access)
    if (pathname.startsWith('/user') || pathname.startsWith('/profile')) {
        // User is authenticated, allow access
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
        '/user/:path*',
        '/profile/:path*'
    ]
};