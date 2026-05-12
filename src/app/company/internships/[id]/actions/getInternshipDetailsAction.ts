"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getInternshipDetails(id: string) {
  const token = await getToken();
  if (!token) throw new Error("Unauthorized");

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const res = await fetch(`${baseUrl}/internship/${id}`, {
    headers: {
      Authorization: `company ${token.token}`,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "failed to fetch internship details");
  }

  return data;
}
