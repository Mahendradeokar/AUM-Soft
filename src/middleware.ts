// import {verifyJwt}  from '@/helper/jwt.helper';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers and set a new header `x-hello-from-middleware1`
  const requestHeaders = request.headers;
  // const Authorization :any = requestHeaders

  // const  tokenData = await verifyJwt(Authorization)
  // console.log('tokenData :>> ', tokenData);
  // if(!tokenData){
  //    return NextResponse.json({error:"you not authorized"})
  // }

  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  });

  // You can also set request headers in NextResponse.rewrite

  // Set a new response header `x-hello-from-middleware2`
  response.headers.set('x-hello-from-middleware2', 'hello');
  // return response
  // Set a new response header `x-hello-from-middleware2`
}
export const config = {
  matcher: ['/api/:path*'],
};
