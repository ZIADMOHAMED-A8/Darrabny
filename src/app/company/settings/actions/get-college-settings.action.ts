"use server";

import { getToken } from "@/lib/utils/get-token.util";
export type CollegeSettingsResponse = unknown;

export async function getCollegeSettingsAction(): Promise<CollegeSettingsResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const token=await getToken()
  const res = await fetch(`${baseUrl}/company/settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `company ${token?.token}`,
    },
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to load settings");
  }

  return payload?.data ?? payload?.settings ?? payload?.college ?? payload;
}
