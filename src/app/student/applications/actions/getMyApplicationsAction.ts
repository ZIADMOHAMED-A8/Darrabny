"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type ApplicationQueryStatus = "all" | "active" | "under-review" | "closed";

type GetMyApplicationsParams = {
  page?: number;
  limit?: number;
  status?: ApplicationQueryStatus;
};

export default async function getMyApplicationsAction({
  page = 1,
  limit = 10,
  status = "all",
}: GetMyApplicationsParams = {}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    status,
  });

  const res = await fetch(`http://localhost:5000/user/myapplications?${query.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get applications");
  }

  return res.json();
}

