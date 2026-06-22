"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getInternshipReviewsAction(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();
    console.log("kosom token",token?.token)
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(
    `${baseUrl}/internship/${id}/reviews`,
    {
      method: "GET",
      headers: {
        Authorization: `user ${token.token.accessToken}`, 
      },
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    throw new Error(message);
  }

  return data;
}