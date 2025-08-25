import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Protect admin routes
  if (pathname.startsWith('/admin/dashboard')) {
    const auth = request.cookies.get('adminAuth')
    
    if (!auth || auth.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/admin/dashboard/:path*',
}