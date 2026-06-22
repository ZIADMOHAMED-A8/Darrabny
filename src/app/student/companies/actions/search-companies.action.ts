"use server";

import type {
  ApiCompany,
  CompaniesPagination,
} from "./get-all-companies.action";

export type SearchCompaniesResponse = {
  success: boolean;
  results: ApiCompany[];
  pagination: CompaniesPagination;
};

type SearchCompaniesParams = {
  q?: string;
  industry?: string;
  page?: number;
  limit?: number;
};

export default async function searchCompaniesAction({
  q = "",
  industry,
  page = 1,
  limit = 10,
}: SearchCompaniesParams = {}): Promise<SearchCompaniesResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const query = new URLSearchParams({
    q,
    page: String(page),
    limit: String(limit),
  });

  if (industry) {
    query.append("industry", industry);
  }
  const res = await fetch(`${baseUrl}/company//search?${query.toString()}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to search companies");
  }

  return {
    success: Boolean(data?.success),
    results: Array.isArray(data?.results) ? data.results : [],
    pagination: {
      page: Number(data?.pagination?.page || page),
      totalPages: Number(data?.pagination?.totalPages || 1),
      totalItems: Number(data?.pagination?.totalItems || 0),
    },
  };
}
