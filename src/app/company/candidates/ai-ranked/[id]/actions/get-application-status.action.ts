"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function updateApplicationStatusAction(
  id: string,
  status: "accepted" | "rejected" | "pending"
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(
    `${baseUrl}/application/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `company ${token.token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}