"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UpdateCollegeNotificationsPayload = {
  email: boolean;
  push: boolean;
  sms: boolean;
};

export async function updateCollegeNotificationsAction(
  payload: UpdateCollegeNotificationsPayload,
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${baseUrl}/college/settings/notifications`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `college ${token?.token}`,
    },
    body: JSON.stringify({
      push:payload.push,
      email:payload.email
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update notifications");
  }

  return data;
}
