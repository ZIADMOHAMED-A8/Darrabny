"use server";

import { getToken } from "@/lib/utils/get-token.util";

const SETTINGS_API_URL = "http://localhost:5000/company/settings";

export async function getCompanySettingsAction() {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(SETTINGS_API_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      return null;
    }

    const message = await res.text();
    throw new Error(message || "Failed to get company settings");
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}
