"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getSavedInternshipsAction() {
  const token = await getToken();

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch("http://localhost:5000/internship/saved", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get saved internships");
  }

  return res.json();
}
