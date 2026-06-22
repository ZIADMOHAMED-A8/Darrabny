"use server";

import { getToken } from "@/lib/utils/get-token.util";

type ApplyToInternshipPayload = {
  coverLetter?: string;
  skills?: string[];
};

export default async function applyToInternshipAction(
  internshipId: string,
  payload: ApplyToInternshipPayload
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(
    `${baseUrl}/internship/ApplyToInternship/${internshipId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `user ${token.token.accessToken}`,
      },
      body: JSON.stringify({
        coverLetter: payload.coverLetter || "",
        skills: payload.skills || [],
      }),
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        data?.msg ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}
