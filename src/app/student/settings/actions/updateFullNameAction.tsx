"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UpdateFullNamePayload = {
  fullName: string;
  links: {
    linkedin?: string;
    github?: string;
  } | null;
};

export default async function updateFullNameAction(
  values: UpdateFullNamePayload,
) {
  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("http://localhost:5000/student/UpdateStudentAccount", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify({
      fullName: values.fullName,
      links: values.links,
    }),
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to update full name");
  }

  return res.json();
}
