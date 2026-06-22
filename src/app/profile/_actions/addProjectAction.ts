"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type AddProjectPayload = {
  type: string;
  title: string;
  description: string;
  thumbnail: string;
  link: string;
};

export default async function addProjectAction(values: AddProjectPayload) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/student/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const contentType = res.headers.get("content-type") || "";
    let message = "Failed to add project";

    if (contentType.includes("application/json")) {
      const errorJson = await res.json();
      message =
        (typeof errorJson?.message === "string" && errorJson.message) ||
        (typeof errorJson?.error === "string" && errorJson.error) ||
        message;
    } else {
      const text = await res.text();
      if (text) message = text;
    }

    throw new Error(`Add project failed (${res.status}): ${message}`);
  }

  return res.json();
}
