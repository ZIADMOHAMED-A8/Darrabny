"use server";

const HARD_CODED_USER_TOKEN =
  "user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaWYxMkBnbWFpbC5jb20iLCJpZCI6IjY5ZTNiNWZlNTM2NjBmYWU0MWE2NzA5OCIsImlhdCI6MTc3ODUyMjM2MiwiZXhwIjoxNzc4NTI1OTYyfQ.9zL7DfivfJWDhWPf27pOlYnLLWFHRgPteglNXrznuAw";

export type CompanyDetailsApiCompany = {
  numberOfEmployees?: {
    from?: number;
    to?: number;
  };
  rating?: number;
  totalReviews?: number;
  _id?: string;
  id?: string;
  companyName?: string;
  description?: string;
  industry?: string;
  address?: string;
  createdAt?: string;
  stats?: {
    activeInternships?: number;
    totalInternships?: number;
    rating?: number;
    totalReviews?: number;
  };
};

export type CompanyDetailsInternship = {
  _id?: string;
  id?: string;
  createdAt?: string;
  postedAgo?: string;
  internshipTittle:string
};

export type GetCompanyDetailsResponse = {
  success: boolean;
  msg?: string;
  company: CompanyDetailsApiCompany;
  internships: CompanyDetailsInternship[];
  pagination?: {
    page?: number;
    limit?: number;
    totalPages?: number;
    totalItems?: number;
  };
};

export default async function getCompanyDetailsAction(
  id: string
): Promise<GetCompanyDetailsResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const res = await fetch(`${baseUrl}/company/getCompany/${id}`, {
    method: "GET",
    headers: {
      Authorization: HARD_CODED_USER_TOKEN,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch company");
  }

  return {
    success: Boolean(data?.success),
    msg: data?.msg,
    company: data?.company || {},
    internships: Array.isArray(data?.internships) ? data.internships : [],
    pagination: data?.pagination,
  };
}
