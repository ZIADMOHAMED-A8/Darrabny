import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/signup", "/forget-password", "/otp", "/create-pass"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, search } = req.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  const isHome = pathname === "/";
  console.log("PATH:", pathname);
  console.log("TOKEN:", token);
  console.log("ENV NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  console.log("COOKIES:", req.cookies.getAll());
  
  // 1) لو معاك توكن وداخل على صفحة لوجين/ساين أب → رجعك للهو
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2) لو انت على الهوم ومفيش توكن → روح لوجين
  if (isHome && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3) لو صفحة محمية وانت مش لوجين
  if (!isAuthRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    // رجع معاه الصفحة اللي كان عايز يروح لها
    const fullPath = pathname + search;
    loginUrl.searchParams.set("callbackUrl", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};

