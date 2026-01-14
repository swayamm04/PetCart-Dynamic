import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const adminToken = request.cookies.get('admin_session')
    const { pathname } = request.nextUrl

    // Protected Routes
    if (pathname.startsWith('/dashboard') || pathname === '/products' || pathname === '/orders') {
        if (!adminToken) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    // Auth Routes
    if (pathname === '/login') {
        if (adminToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/products/:path*',
        '/orders/:path*'
    ],
}
