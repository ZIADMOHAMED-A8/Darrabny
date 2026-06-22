"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type CompanyKpis = {
  totalApplicants: { count: number; growthPct: number };
  totalCompletedTrainees: { count: number; growthPct: number };
  activePostings: { total: number; internships: number; jobs: number };
};

export type CompanyInternship = {
  student: { name: string; email: string };
  internshipId: string;
  role: string;
  status: string;
  studentCount: { current: number; capacity: number | null };
};

export type CompanyVerification = {
  status: "pending" | "verified" | "rejected";
  validUntil: string | null;
};

export type AcademicPartner = {
  universityName: string;
  agreementStatus: string;
};

export type CompanyDashboardData = {
  kpis: CompanyKpis;
  ongoingInternships: CompanyInternship[];
  acceptanceRate: number;
  verificationStatus: CompanyVerification;
  academicPartners: AcademicPartner[];
};

export default async function getCompanyDashboardAction(): Promise<CompanyDashboardData> {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const token = await getToken();
  const res = await fetch(`${baseUrl}/company/dashboard`, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: `company ${token?.token}`,
    },
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(
      payload?.message || `Failed to fetch company dashboard ${res.status}`
    );
  }

  return payload;
}
