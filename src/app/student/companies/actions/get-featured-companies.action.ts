"use server";

export type FeaturedApiCompany = {
  id?: string;
  name?: string;
  logo?: unknown;
  industry?: string;
  address?: string;
  rating?: number;
  totalReviews?: number;
  score?: number;
  highlight?: string;
};

export type GetFeaturedCompaniesResponse = {
  success: boolean;
  featured: FeaturedApiCompany[];
};

export default async function getFeaturedCompaniesAction(): Promise<GetFeaturedCompaniesResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const res = await fetch(`${baseUrl}/company/featured`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch featured companies");
  }

  return {
    success: Boolean(data?.success),
    featured: Array.isArray(data?.featured) ? data.featured : [],
  };
}
