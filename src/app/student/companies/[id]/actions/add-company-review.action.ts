"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type AddCompanyReviewPayload = {
  rating: number;
  comment: string;
};

export default async function addCompanyReviewAction(
  internshipId: string,
  payload: AddCompanyReviewPayload
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const token = await getToken();

  if (!token?.token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${baseUrl}/internship/${internshipId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `user ${token.token.accessToken}`,
    },
    body: JSON.stringify({
      rating: payload.rating,
      comment: payload.comment,
    }),
    cache: "no-store",
  });

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
