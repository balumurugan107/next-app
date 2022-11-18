import { NextResponse, NextRequest } from 'next/server';
import { gsTokenKey } from './src/_constant';

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;
  const cookie = request.cookies;
  const url = request.nextUrl.clone()
  if (cookie) {
    const token = cookie.get(gsTokenKey)
    if (token && pathname == '/') {
      url.pathname = '/home'
      return NextResponse.rewrite(url)

    }
  }
  return NextResponse.next()
}
