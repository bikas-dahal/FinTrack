import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { auth } from './auth';
import { routing } from './i18n/routing';

// Create the next-intl middleware for internationalization 
// const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // Check if the path matches `/api/hono/:path*` (authentication-specific paths)
  if (req.nextUrl.pathname.startsWith('/api/hono')) {
    // Authentication logic
    const session = await auth();

    // If no session or no user, block access
    if (!session || !session.user) {
      return new NextResponse(
        JSON.stringify({ error: 'Please login to access this resource' }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
  }

  // Run the intlMiddleware for internationalization
  return  NextResponse.next();
}

export const config = {
  matcher: ['/api/hono/:path*', '/', '/(np|en)/:path*'], // Include both auth-specific and intl paths
};
