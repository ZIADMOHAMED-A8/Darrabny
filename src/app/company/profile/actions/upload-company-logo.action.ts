"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function uploadCompanyLogoAction({
  companyId,
  formData,
}: {
  companyId: string;
  formData: FormData;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(
    `${baseUrl}/company/uploadCompanyLogo/${companyId}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `company ${token.token}`,
      },
      body: formData,
    }
  );
  console.log(companyId)
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(
      data?.message || data?.error || "Failed to upload company logo"
    );
  }

  return data;
}
