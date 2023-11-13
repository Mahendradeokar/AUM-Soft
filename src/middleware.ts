import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  try {
    const token: any = request.cookies.get('token');

    if (request.nextUrl.pathname.startsWith('/auth')) {
      if (token) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // login & register routes
    if (['/login', '/signup'].includes(request.nextUrl.pathname)) {
      if (token) {
        return NextResponse.redirect(new URL('/', request.url));
      }
      return NextResponse.next();
    }
    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}

export const config = {
  matcher: ['/', '/login', '/signup', '/api/:path*'],
};
