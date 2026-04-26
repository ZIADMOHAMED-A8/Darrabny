"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getSkillsAction() {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("http://localhost:5000/student/skills", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get skills");
  }

  return res.json();
}
