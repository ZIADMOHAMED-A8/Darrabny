"use server";

import { getToken } from "@/lib/utils/get-token.util";

type GetMyInternshipsParams = {
  page?: number;
  limit?: number;
};

export default async function getMyInternshipsAction({
  page = 1,
  limit = 10,
}: GetMyInternshipsParams = {}) {
  const token = await getToken();

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const res = await fetch(`${baseUrl}/internship/my?${query.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get internships");
  }

  return res.json();
}

