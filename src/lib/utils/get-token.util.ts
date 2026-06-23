"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const cookieStore = await cookies();

  const tokenCookies =
    cookieStore.get("__Secure-next-auth.session-token")?.value ||
    cookieStore.get("next-auth.session-token")?.value;

  if (!tokenCookies) return null;

  const jwt = await decode({
    token: tokenCookies,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return jwt;
}