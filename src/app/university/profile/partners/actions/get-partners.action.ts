"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type PartnerCompany = {
  companyId: string;
  companyName: string;
  industry: string;
  location: string;
  logo?: { secure_url: string };
  rating: number;
  reviewCount: number;
  isTopPartner: boolean;
  skills: string[];
  isInternSparkCertified?: boolean;
};

export type PartnersPagination = {
  totalCompanies: number;
  currentPage: number;
  totalPages: number;
};

export type PartnersResponse = {
  companies: PartnerCompany[];
  pagination: PartnersPagination;
};

export default async function getPartnersAction(
  page: number = 1
): Promise<PartnersResponse> {
  const token = await getToken();

  const res = await fetch(
    `http://localhost:5000/college//partners?page=${page}`,
    {
      method: "GET",
      headers: {
        Authorization: `college ${token?.token}`,
      },
      cache: "no-store",
    }
  );

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.message || "Failed to fetch partners");
  }

  return payload.data;
}
