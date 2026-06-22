"use server";

export type ApiCompany = {
  _id?: string;
  id?: string;
  companyName?: string;
  industry?: string;
  address?: string;
  rating?: number;
  totalReviews?: number;
  isFeatured?: boolean;
};

export type CompaniesPagination = {
  page: number;
  totalPages: number;
  totalItems: number;
};

export type GetAllCompaniesResponse = {
  success: boolean;
  companies: ApiCompany[];
  pagination: CompaniesPagination;
};

type GetAllCompaniesParams = {
  page?: number;
  limit?: number;
};

export default async function getAllCompaniesAction({
  page = 1,
  limit = 3,
}: GetAllCompaniesParams = {}): Promise<GetAllCompaniesResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  const res = await fetch(
    `${baseUrl}/company/allCompanies?${query.toString()}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch companies");
  }

  return {
    success: Boolean(data?.success),
    companies: Array.isArray(data?.companies) ? data.companies : [],
    pagination: {
      page: Number(data?.pagination?.page || page),
      totalPages: Number(data?.pagination?.totalPages || 1),
      totalItems: Number(data?.pagination?.totalItems || 0),
    },
  };
}
