"use server";

import { getToken } from "next-auth/jwt";
import { headers, cookies } from "next/headers";

export async function getServerToken(): Promise<{ accessToken: string } | null> {
  const req = {
    headers: Object.fromEntries(headers()),
    cookies: Object.fromEntries(
      cookies()
        .getAll()
        .map((c) => [c.name, c.value])
    ),
  } as any;

  try {
    const token = await getToken({ req });
    console.log("Token received in getServerToken:", token); // <-- Add this line
    return token;
  } catch (error) {
    console.error("Error getting token in custom helper:", error);
    return null;
  }
}