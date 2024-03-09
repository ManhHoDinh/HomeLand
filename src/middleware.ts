import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateToken } from './libs/utils'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const auth = request.url.split("?")[1]
  if (request.url.includes("?") && auth && token) 
    return
  const validated = await validateToken(token);
  if (validated)
    return NextResponse.redirect(request.url + "?auth=true")
  else
    if(!request.url.includes("home"))
      return NextResponse.redirect("https://" + request.nextUrl.pathname + "/home");
    else
      return
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/home/:path*',
}