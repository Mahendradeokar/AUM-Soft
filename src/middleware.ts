import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';
import { getTokenData } from './helper/jwt.helper';

export default async function middleware(request: NextRequest) {
  try {
    const token: any = request.cookies.get('token');
    if (!token) {
      throw new Error('unauthorized');
    }
    await getTokenData(token.value);
    // if (isAdminRoute(pathname) && role !== "admin") {
    //   return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    // }
    return NextResponse.next();
  } catch (error: any) {
    let response: {
      message: string;
      error: string;
      redirect?: string;
    } = {
      message: 'Something went wrong!',
      error: error.message,
      redirect: '/un',
    };

    let status = {
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };

    switch (error.code ?? error.message) {
      case 'ERR_JWT_EXPIRED':
        response = {
          message: 'Token expired',
          error: 'ERR_JWT_EXPIRED',
          redirect: '/login',
        };
        status = {
          status: StatusCodes.UNAUTHORIZED,
        };
        break;

      case 'unauthorized':
        response = {
          message: 'Unauthorized request........',
          error: 'unauthorized',
          redirect: '/login',
        };

        status = {
          status: StatusCodes.UNAUTHORIZED,
        };
        break;

      default:
        break;
    }

    if (!request.nextUrl.pathname.includes('api')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    delete response.redirect;
    return NextResponse.json(response, status);
  }
}

export const config = {
  matcher: `/((?!login|signUp|api/auth/login|api/auth/signup|_next/static|_next/image|favicon.ico).*)`,
};
