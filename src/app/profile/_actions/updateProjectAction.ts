"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UpdateProjectPayload = {
  id: string;
  description: string;
  thumbnail: string;
};

export default async function updateProjectAction(values: UpdateProjectPayload) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/student/projects/${values.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify({
      description: values.description,
      thumbnail: values.thumbnail,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to update project");
  }

  return res.json();
}
