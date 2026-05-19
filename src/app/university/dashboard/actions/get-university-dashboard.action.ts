"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type UniversityDashboardStats = {
  totalApplicants: number;
  totalCompletedTrainees: number;
  acceptanceRate: number;
};

export type UniversityVerificationStatus = {
  isVerified: boolean;
  approvedByAdmin: boolean;
  validUntil: string | null;
};

export type UniversityCompany = {
  _id: string;
  companyName: string;
  industry: string;
};

export type UniversityInternship = {
  id: string;
  title: string;
  status: string;
  company: UniversityCompany;
  applicantsCount: number;
};

export type UniversityDashboardData = {
  stats: UniversityDashboardStats;
  verificationStatus: UniversityVerificationStatus;
  ongoingInternships: UniversityInternship[];
  academicPartners: UniversityCompany[];
};

export default async function getUniversityDashboardAction(): Promise<UniversityDashboardData> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(`${baseUrl}/college/dashboard`, {
    method: "GET",
    headers: {
      Authorization: `college ${token?.token}`,
    },
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.message || "Failed to fetch dashboard");
  }

  return payload.data;
}
