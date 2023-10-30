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
    return NextResponse.json(
      {
        message: 'Something went wrong',
        error: error.message,
      },
      {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      },
    );
  }
}
export const config = {
  matcher: `/((?!login|singup|api/auth/login|api/auth/signup|_next/static|_next/image|favicon.ico).*)`,
};
