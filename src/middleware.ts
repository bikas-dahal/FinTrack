// middleware.ts
import { auth } from './auth'
import { NextResponse, NextRequest } from 'next/server'

// Middleware function wrapped with auth
export default auth(async function middleware(req: NextRequest) {
  // Get the session using auth
  const session = await auth()

  // If no session or no user, return unauthorized
  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ error: "Please login to access this resource" }), 
      { 
        status: 401,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  // If authenticated, proceed to the API route
  return NextResponse.next()
})

export const config = {
    matcher: ['/api/hono/:path*'],
  }
  