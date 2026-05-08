"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getApplicationDetailsAction(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken();
  console.log(token?.token)
  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(
    `${baseUrl}/application/details/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `company ${token.token}`,
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

  return data.data;
}