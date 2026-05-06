"use server";

import { getToken } from "@/lib/utils/get-token.util";
import type { InternshipSummary } from "../_types/report";

export async function getCompanyInternships() {
  const token = await getToken();
  const accessToken = token?.token;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const query = new URLSearchParams({ page: "1", limit: "10" });

  const res = await fetch(
    `${baseUrl}/internship/companyInternships?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `company ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get internships");
  }

  const payload = await res.json();
  const rawItems = payload?.data?.internships || payload?.data || payload || [];

  if (!Array.isArray(rawItems)) {
    return [] as InternshipSummary[];
  }

  return rawItems.map((item: any) => ({
    id: String(item?._id || item?.id || ""),
    title: String(
      item?.internshipTittle || item?.title || "Untitled Internship",
    ),
    activeStudents: Number(
      item?.activeStudents ??
        item?.studentsCount ??
        item?.acceptedStudents ??
        0,
    ),
    pendingReports: Number(item?.pendingReportsCount ?? item?.reportsPending ?? 0),
  })) as InternshipSummary[];
}
