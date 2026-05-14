"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function updateCompanyProfileAction(
  payload: any
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000";

  const token = await getToken();

  const response = await fetch(
    `${baseUrl}/company/me`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `company ${token?.token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Failed to update profile");
  }

  return data;
}