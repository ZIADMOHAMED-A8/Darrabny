"use server";

const COLLEGE_TOKEN =
  "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE";

export type CollegeSettingsResponse = unknown;

export async function getCollegeSettingsAction(): Promise<CollegeSettingsResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/college/settings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: COLLEGE_TOKEN,
    },
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(payload?.message || "Failed to load college settings");
  }

  return payload?.data ?? payload?.settings ?? payload?.college ?? payload;
}
