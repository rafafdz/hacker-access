import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from './utils/supabase'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Si el usuario no está autenticado y está intentando acceder a una ruta protegida
  if (!user && request.nextUrl.pathname.startsWith('/members')) {
    // Redirige al usuario a la página de inicio de sesión
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Permite el acceso a la ruta
  return response
}

export const config = {
  matcher: ['/members/:path*'], // Protege todas las rutas bajo /members
}
