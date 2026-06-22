"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getCompanyProfileAction() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const token = await getToken();

  const response = await fetch(
    `${baseUrl}/company/me`,
    {
      method: "GET",
      headers: {
        Authorization: `company ${token?.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data || "Failed to fetch profile");
  }

  return data;
}