import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "./lib/utils/get-token.util";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";


const authRoutes = [
  "/login",
  "/signup",
  "/forget-password",
  "/otp",
  "/create-pass",
];
const universityRoutes = [

  /^\/university\/dashboard(?:\/[^/]+)?$/,
  /^\/university\/internships(?:\/[^/]+)?$/,
  /^\/university\/profile(?:\/[^/]+)?$/,
  /^\/university\/settings$/,
  /^\/university\/student_profile(?:\/[^/]+)?$/,
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
  const cookieStore = await cookies()
  const token = await getToken({ req, secret });
  const role = cookieStore.get('role')?.value ?? null


  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isHome = pathname === "/";

  console.log("TOKEN FROM MIDDLEWARE:", token, pathname);

  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    role === "college" &&
    !pathname.startsWith("/university") &&
    !pathname.startsWith("/college") &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/policies') &&
    !authRoutes.includes(pathname)
  ) {
    return NextResponse.redirect(
      new URL("/university/dashboard", req.url)
    );
  }
  if (
    role === "user" &&
    pathname!=='/'  &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith("/student") &&
    !pathname.startsWith("/profile") &&
    !pathname.startsWith('/policies') &&
    !authRoutes.includes(pathname)
  ) {
    return NextResponse.redirect(
      new URL("/student/internships", req.url)
    );
  }
  if (
    role === "company" &&
    !pathname.startsWith("/company") &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/policies') &&
    !authRoutes.includes(pathname)
  ) {
    return NextResponse.redirect(
      new URL("/company/dashboard", req.url)
    );
  }
  if (isHome && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (!isAuthRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(loginUrl);
  }
  // if (role === 'college' && (!universityRoutes.some((route) => route.test(pathname) || !authRoutes.some((route) =>route===pathname)))) {
  //   return NextResponse.redirect(new URL("/university/dashboard", req.url));

  // }

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