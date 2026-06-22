"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function uploadResumeAction(formData: FormData) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/student/resume`, {
    method: "PUT",
    headers: {
      Authorization: `user ${token.token.accessToken}`,
    },
    body: formData,
  });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    if (contentType.includes("application/json")) {
      const errorJson = await res.json();
      throw new Error(
        errorJson?.message || errorJson?.error || "Failed to upload resume",
      );
    }

    const message = await res.text();
    throw new Error(message || "Failed to upload resume");
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return { success: true };
}
