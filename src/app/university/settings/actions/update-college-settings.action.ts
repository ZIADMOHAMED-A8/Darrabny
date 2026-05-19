"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UpdateCollegeSettingsPayload = {
  collegeName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export async function updateCollegeSettingsAction(
  payload: UpdateCollegeSettingsPayload,
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${baseUrl}/college/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `college ${token?.token}`,
    },
    body: JSON.stringify({
      collegeName:payload.collegeName,
      collegeEmail:payload.email,
      address:payload.address
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update college settings");
  }

  return data;
}
