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

  const res = await fetch(`http://localhost:5000/internship/my?${query.toString()}`, {
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

