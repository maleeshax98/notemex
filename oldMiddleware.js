import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { AuthOptions } from "./app/api/auth/[...nextauth]/route";

export { default } from "next-auth/middleware";
export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const dynamicRouteMatch = pathname.match(/^\/notes\/(\d+)/);

  const token = await getToken({ req });

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname) 
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
    if (req.nextUrl.pathname === "/admin") {
      const session = await getServerSession(AuthOptions);
      const user = await prisma.user.findUnique({
        where: {
          id: session?.user?.id,
        },
      });

      if (user?.role === "ADMIN") {
        return NextResponse.redirect(new URL("/admin", req.url));
      }

      return NextResponse.redirect(new URL("/", req.url));
    }
    
    if (req.nextUrl.pathname === "/signin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}
// export const config = {
//     matcher: ['/notes/[id]'],
// }
