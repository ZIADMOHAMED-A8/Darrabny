"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function toggleSaveInternshipAction(internshipId: string) {
  const token = await getToken();

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/internship/save/${internshipId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to toggle saved internship");
  }

  return res.json();
}
