"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type InternshipQueryStatus = "in-progress" | "completed";

type GetMyInternshipsParams = {
  page?: number;
  limit?: number;
  status?: InternshipQueryStatus;
};

export default async function getMyInternshipsAction({
  page = 1,
  limit = 10,
  status,
}: GetMyInternshipsParams = {}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) {
    query.set("status", status);
  }

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

