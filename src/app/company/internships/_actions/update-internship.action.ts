"use server";
import { getToken } from "@/lib/utils/get-token.util";

export async function updateInternshipAction(id: string, formData: FormData) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${baseUrl}/Internship/${id}`, {
    method: "PATCH",
    body: formData,
    headers: {
      Authorization: `company ${token.token}`,
    },
  });

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