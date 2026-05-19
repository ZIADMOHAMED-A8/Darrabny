"use server";

const COLLEGE_TOKEN =
  "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE";

export type UpdateCollegeSettingsPayload = {
  collegeName: string;
  email: string;
  phoneNumber: string;
  address: string;
};

export async function updateCollegeSettingsAction(
  payload: UpdateCollegeSettingsPayload,
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const res = await fetch(`${baseUrl}/college/settings`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: COLLEGE_TOKEN,
    },
    body: JSON.stringify({
      collegeName:payload.collegeName,
      collegeEmail:payload.email,
      address:payload.address
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update college settings");
  }

  return data;
}
