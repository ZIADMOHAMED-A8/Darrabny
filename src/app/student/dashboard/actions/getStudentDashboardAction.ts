"use server";

import { getToken } from "@/lib/utils/get-token.util";

type GetStudentDashboardParams = {
  activeLimit?: number;
  savedLimit?: number;
};

export default async function getStudentDashboardAction({
  activeLimit = 5,
  savedLimit = 5,
}: GetStudentDashboardParams = {}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams({
    activeLimit: String(activeLimit),
    savedLimit: String(savedLimit),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/user/dashboard?${query.toString()}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get dashboard");
  }

  return res.json();
}

