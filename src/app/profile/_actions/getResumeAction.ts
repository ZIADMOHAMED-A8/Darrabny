"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getResumeAction() {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("http://localhost:5000/student/resume", {
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
    throw new Error(message || "Failed to get resume");
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}
