"use server";

import { getToken } from "@/lib/utils/get-token.util";
import type { SkillPayload } from "./addSkillAction";

export default async function deleteSkillAction(values: SkillPayload) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`http://localhost:5000/student/skills`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to delete skill");
  }

  return res.json();
}
