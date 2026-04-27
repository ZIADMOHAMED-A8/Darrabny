"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type CompanyInternshipQueryStatus =
  | "all"
  | "active"
  | "closed"
  | "starting_soon";

type GetCompanyInternshipsParams = {
  page?: number;
  limit?: number;
  status?: CompanyInternshipQueryStatus;
};

export default async function getCompanyInternshipsAction({
  page = 1,
  limit = 10,
  status = "all",
}: GetCompanyInternshipsParams = {}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status && status !== "all") {
    query.set("status", status);
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const res = await fetch(
    `${baseUrl}/internship/companyInternships?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'company eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YTdiYzQyMjU3MmViN2U3Y2Q5ZjUwMCIsInJvbGUiOiJjb21wYW55IiwiaWF0IjoxNzczMDMwMDkxLCJleHAiOjE3NzM2MzQ4OTF9.l0__8OiCXEr9YGgxVkjzQJBt2PBYeGp8iiSc3jrCt3A',
      },
      
    }
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to get internships");
  }

  return res.json();
}
