"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type SkillPayload = {
  skillName: string;
};

export default async function addSkillAction(values: SkillPayload) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/student/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify(values),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to add skill");
  }

  return res.json();
}
