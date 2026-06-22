"use server";

import type { CompanyDetailsInternship } from "./get-company-details.action";

const HARD_CODED_USER_TOKEN =
  "user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaWYxMkBnbWFpbC5jb20iLCJpZCI6IjY5ZTNiNWZlNTM2NjBmYWU0MWE2NzA5OCIsImlhdCI6MTc3ODUyMjM2MiwiZXhwIjoxNzc4NTI1OTYyfQ.9zL7DfivfJWDhWPf27pOlYnLLWFHRgPteglNXrznuAw";

export type GetCompanyInternshipsResponse = {
  success: boolean;
  internships: CompanyDetailsInternship[];
  pagination: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
};

export default async function getCompanyInternshipsAction(
  id: string
): Promise<GetCompanyInternshipsResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const res = await fetch(`${baseUrl}/company/${id}/internships`, {
    method: "GET",
    headers: {
      Authorization: HARD_CODED_USER_TOKEN,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch company internships");
  }

  return {
    success: Boolean(data?.success),
    internships: Array.isArray(data?.internships) ? data.internships : [],
    pagination: {
      page: Number(data?.pagination?.page || 1),
      totalPages: Number(data?.pagination?.totalPages || 1),
      totalItems: Number(data?.pagination?.totalItems || 0),
    },
  };
}
