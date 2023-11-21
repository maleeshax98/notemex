import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const dynamicRouteMatch = pathname.match(/^\/notes\/(\d+)/);
  // console.log(pathname)
  // console.log(dynamicRouteMatch)

  const token = await getToken({ req });
  // console.log("Token middleware", token)

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/api") || //  exclude all API routes
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

  if (req.nextUrl.pathname === "/skills") {
    return NextResponse.redirect(new URL("/beta", req.url));
  }

  if (!token) {
    if (!dynamicRouteMatch) {
      if (req.nextUrl.pathname !== "/signin") {
        return NextResponse.redirect(new URL("/signin", req.url));
      }
    }
  }

  if (token) {
    if (req.nextUrl.pathname === "/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
// export const config = {
//     matcher: ['/notes/[id]'],
// }
