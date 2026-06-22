"use server";
import { getToken } from "@/lib/utils/get-token.util";

export async function addInternshipAction(formData: FormData) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  console.log("token from action", token.token);

  const response = await fetch(`${baseUrl}/Internship/add`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `company ${token.token}`,
    },
  });

  const data = await response.json().catch(() => null);

  console.log("STATUS:", response.status);
  console.log("BACKEND RESPONSE:", JSON.stringify(data, null, 2));

  // ❌ better error handling
  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    console.error("UPLOAD ERROR:", data);

    throw new Error(message);
  }

  return data;
}
