"use server";

const COLLEGE_TOKEN =
  "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE";

export type UpdateCollegeNotificationsPayload = {
  email: boolean;
  push: boolean;
  sms: boolean;
};

export async function updateCollegeNotificationsAction(
  payload: UpdateCollegeNotificationsPayload,
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/college/settings/notifications`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: COLLEGE_TOKEN,
    },
    body: JSON.stringify({
      push:payload.push,
      email:payload.email
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update notifications");
  }

  return data;
}
