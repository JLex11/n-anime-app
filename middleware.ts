import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

const protectedRoutes = ['/perfil', '/favoritos', '/mi-lista']
const authRoutes = ['/login', '/register']

export async function middleware(request: NextRequest) {
	const { supabaseResponse, user } = await updateSession(request)
	const { pathname } = request.nextUrl

	// Redirect authenticated users away from auth pages
	if (user && authRoutes.some((route) => pathname.startsWith(route))) {
		return NextResponse.redirect(new URL('/', request.url))
	}

	// Redirect unauthenticated users from protected routes
	if (!user && protectedRoutes.some((route) => pathname.startsWith(route))) {
		const redirectUrl = new URL('/login', request.url)
		redirectUrl.searchParams.set('redirect', pathname)
		return NextResponse.redirect(redirectUrl)
	}

	return supabaseResponse
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * - public folder
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}
