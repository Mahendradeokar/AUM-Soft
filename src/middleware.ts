import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenData } from './helper/jwt.helper';

export default async function middleware(request: NextRequest) {
  try {
    const token: any = request.cookies.get('token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    await getTokenData(token.value);
    // if (isAdminRoute(pathname) && role !== "admin") {
    //   return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    // }
    return NextResponse.next();
  } catch (error: any) {
    let response = {
      message: 'Something went wrong',
      error: error.message,
    };

    let status = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
    if (error.code === 'ERR_JWT_EXPIRED') {
      if (!request.nextUrl.pathname.includes('api')) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
      response = {
        message: 'Token expired',
        error: 'ERR_JWT_EXPIRED',
      };
      status = {
        status: StatusCodes.UNAUTHORIZED,
      };
    }
    return NextResponse.json(response, status);
  }
}
export const config = {
  matcher: `/((?!login|singup|api/auth/login|api/auth/signup|api/profile/|_next/static|_next/image|favicon.ico).*)`,
};
