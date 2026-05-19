"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getCompanyAction(companyId: string) {
  const token = await getToken();

  const res = await fetch(
    `http://localhost:5000/company//getCompany/${companyId}`,
    {
      method: "GET",
      headers: {
        Authorization: `college ${token?.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    throw new Error(data?.msg || "Failed to fetch company");
  }

  return data;
}
