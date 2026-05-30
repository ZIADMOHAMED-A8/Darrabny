"use server";

const HARD_CODED_USER_TOKEN =
  "user eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhaWYxMkBnbWFpbC5jb20iLCJpZCI6IjY5ZTNiNWZlNTM2NjBmYWU0MWE2NzA5OCIsImlhdCI6MTc3ODUyMjM2MiwiZXhwIjoxNzc4NTI1OTYyfQ.9zL7DfivfJWDhWPf27pOlYnLLWFHRgPteglNXrznuAw";

export type CompanyReviewApiItem = {
  id?: string;
  _id?: string;
  name?: string;
  userName?: string;
  createdAt?: string;
  rating?: number;
  text?: string;
  comment?: string;
  likes?: number;
  comments?: number;
  user?: {
    fullName?: string;
  };
};

export type GetCompanyReviewsResponse = {
  success: boolean;
  averageRating: number;
  totalReviews: number;
  reviews: CompanyReviewApiItem[];
};

export default async function getCompanyReviewsAction(
  id: string
): Promise<GetCompanyReviewsResponse> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  const res = await fetch(`${baseUrl}/company/${id}/reviews`, {
    method: "GET",
    headers: {
      Authorization: HARD_CODED_USER_TOKEN,
    },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch company reviews");
  }

  return {
    success: Boolean(data?.success),
    averageRating: Number(data?.averageRating || 0),
    totalReviews: Number(data?.totalReviews || 0),
    reviews: Array.isArray(data?.reviews) ? data.reviews : [],
  };
}
