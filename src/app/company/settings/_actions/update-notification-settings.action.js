"use server";

import { getToken } from "@/lib/utils/get-token.util";

const SETTINGS_API_URL = "http://localhost:5000/company/settings";

export async function updateNotificationSettingsAction(payload) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(SETTINGS_API_URL, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to update notification settings");
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}
