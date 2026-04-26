"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type DeleteProjectPayload = {
  id: string;
};

export default async function deleteProjectAction(values: DeleteProjectPayload) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`http://localhost:5000/student/projects/${values.id}`, {
    method: "DELETE",
    headers: {
      Authorization: `user ${token.token.accessToken}`,
    },
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to delete project");
  }

  return res.json();
}
