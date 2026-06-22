// actions/get-company-verification.action.ts

"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getCompanyVerificationAction() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const token = await getToken();

  const response = await fetch(
    `${baseUrl}/company/verification`,
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
    throw new Error(
      data?.message || "Failed to fetch verification"
    );
  }

  return data.data;
}