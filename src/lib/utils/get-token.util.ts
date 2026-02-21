import { decode } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function getToken(req: NextRequest) {
  const tokenCookie =
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  if (!tokenCookie) return null;

  try {
    const jwt = await decode({
      token: tokenCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return jwt;
  } catch {
    return null;
  }
}
