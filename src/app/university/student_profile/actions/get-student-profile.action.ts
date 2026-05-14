"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getStudentProfileAction(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "http://localhost:5000";

  const token = await getToken();

  const res = await fetch(
    `${baseUrl}/student/profile/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE`,
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