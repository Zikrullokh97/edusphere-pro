import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes (no authentication required)
const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/',
]

// Protected route patterns
const protectedRoutes = [
  '/dashboard',
  '/teacher',
  '/student',
  '/parent',
  '/admin',
]

// Role-based access control
const roleRoutes: Record<string, string[]> = {
  SUPER_ADMIN: ['/dashboard', '/admin', '/settings'],
  MINISTRY_ADMIN: ['/dashboard', '/admin', '/settings'],
  DISTRICT_ADMIN: ['/dashboard', '/admin', '/settings'],
  SCHOOL_ADMIN: ['/dashboard', '/admin', '/settings'],
  TEACHER: ['/dashboard', '/teacher', '/classes', '/attendance', '/grades', '/schedule', '/homework', '/exams', '/reports'],
  PARENT: ['/dashboard', '/parent', '/children', '/messages', '/payments'],
  STUDENT: ['/dashboard', '/student', '/schedule', '/grades', '/homework', '/exams'],
}

/**
 * Middleware for route protection and role-based access
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check if route is public
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  )

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // Get token from cookies or localStorage (via header)
  const token = request.cookies.get('access_token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '')

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Verify token and get user role (simplified - in production use JWT verification)
  try {
    // In production, verify JWT token here
    // For now, we'll check if user data exists in cookies
    const userCookie = request.cookies.get('user')?.value
    if (!userCookie) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const user = JSON.parse(userCookie)
    const userRole = user.role

    // Check if route requires specific role
    const isProtectedRoute = protectedRoutes.some(route => 
      pathname === route || pathname.startsWith(route + '/')
    )

    if (isProtectedRoute) {
      // Get allowed routes for user role
      const allowedRoutes = roleRoutes[userRole] || []
      
      // Check if user has access to this route
      const hasAccess = allowedRoutes.some(route => 
        pathname === route || pathname.startsWith(route + '/')
      )

      if (!hasAccess) {
        // Redirect to appropriate dashboard
        return NextResponse.redirect(new URL('/dashboard', request.url))
      }
    }

    return NextResponse.next()
  } catch (error) {
    // Invalid token or user data
    return NextResponse.redirect(new URL('/login', request.url))
  }
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
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}