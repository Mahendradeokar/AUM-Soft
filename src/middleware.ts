/* eslint-disable @typescript-eslint/no-unused-vars */
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';
import { TOKEN } from './common/constants';

const DASHBOARD_URL = '/order-management';
export default async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get(TOKEN)?.value;
    // login & register routes
    if (['/login', '/signUp'].includes(request.nextUrl.pathname)) {
      if (token) {
        return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
      }
      return NextResponse.next();
    }

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL(DASHBOARD_URL, request.url));
    }
    return NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: StatusCodes.INTERNAL_SERVER_ERROR });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
