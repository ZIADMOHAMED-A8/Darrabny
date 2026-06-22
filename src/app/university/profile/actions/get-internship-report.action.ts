"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getInternshipReportAction(reportId: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${baseUrl}/internshipreport/${reportId}`,
    {
      method: "GET",
      headers: {
        Authorization: `college ${token?.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch report");
  }

  return data.data;
}
