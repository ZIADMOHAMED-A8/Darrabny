"use server";


  import { getToken } from "@/lib/utils/get-token.util";

export type UpdateCollegeSettingsPayload = {
  companyName: string;
  email: string;
  companyPhone: string;
  address: string;
};

export async function updateCollegeSettingsAction(
  payload: UpdateCollegeSettingsPayload,
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token=await getToken()

  const res = await fetch(`${baseUrl}/company/settings`, {
    method: "PATCH",
    headers: {
      Authorization: `company ${token?.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyName:payload.companyName,
      address:payload.address,
      companyPhone:payload.companyPhone
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to update company settings");
  }

  return data;
}
