"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getStudentProfileAction(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${baseUrl}/student/profile/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `college ${token?.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch profile");
  }

  return data.data;
}
