import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "./lib/utils/get-token.util";
import { signOut } from "next-auth/react";


const authRoutes = [
  "/login",
  "/signup",
  "/forget-password",
  "/otp",
  "/create-pass",
];

// Add static asset extensions to ignore
const PUBLIC_FILE = /\.(.*)$/; // matches any path with a file extension

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // ✅ Skip middleware for static files (images, fonts, etc.)
  if (
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret });

  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isHome = pathname === "/";

  console.log("TOKEN FROM MIDDLEWARE:", token ? "exists" : "null", "| PATH:", pathname);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isHome && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!isAuthRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths EXCEPT:
     * - api/auth (NextAuth routes)
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - Files with extensions (images, fonts, etc.)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};