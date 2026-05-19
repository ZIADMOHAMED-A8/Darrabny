"use server";

import { getToken } from "@/lib/utils/get-token.util";

type PendingEndorsementsResponse<TData = unknown> = {
  success: boolean;
  message?: string;
  data: TData;
};

export default async function getPendingEndorsementsAction() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${baseUrl}/college/pending-endorsements`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `college ${token?.token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to fetch pending endorsements");
  }

  return (await res.json()) as PendingEndorsementsResponse<unknown[]>;
}
