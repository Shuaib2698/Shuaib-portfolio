// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Protect admin routes
  if (pathname.startsWith('/admin/dashboard')) {
    // Check for cookie authentication
    const authCookie = request.cookies.get('adminAuth');
    
    // Check for localStorage via headers (for client-side)
    const authHeader = request.headers.get('authorization');
    
    if ((!authCookie || authCookie.value !== 'true') && 
        (!authHeader || authHeader !== 'Bearer true')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/dashboard/:path*',
}