import { NextRequest, NextResponse } from 'next/server';
// import { ITokenData } from './common/globle-constant';
// import { verifyJwt } from './helper/jwt.helper';
const isProfileRoute = (pathname: string) => {
  return pathname.startsWith('/api/profile');
};
export default async function middleware(request: NextRequest) {
  try {
    const token: any = request.headers.get('authorization');
    const { pathname } = request.nextUrl;

    if (isProfileRoute(pathname) && !token) {
      return NextResponse.redirect(new URL('/api/auth/unauthorized', request.url));
    }

    // if (isAdminRoute(pathname) && role !== "admin") {
    //   return NextResponse.redirect(new URL('/api/auth/unauthorized', req.url));
    // }
    return NextResponse.next();
  } catch (error) {
    return error;
  }
}
export const config = {
  matcher: ['/api/profile/:path*'],
};
