// actions/upload-verification-document.action.ts

"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function uploadVerificationDocumentAction(
  formData: FormData
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `${baseUrl}/company/verification/documents`,
    {
      method: "POST",
      headers: {
        Authorization: `company ${token.token}`,
      },
      body: formData,
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to upload document"
    );
  }

  return data;
}