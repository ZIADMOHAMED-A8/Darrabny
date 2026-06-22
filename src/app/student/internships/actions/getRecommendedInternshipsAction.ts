

"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getRecommendedInternshipsAction() {
  const token = await getToken();

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/internship/recommended`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.json();
    throw new Error(message.message || "Failed to get recommended internships");
  }

  return res.json();
}
