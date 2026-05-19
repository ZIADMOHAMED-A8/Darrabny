"use server";

const COLLEGE_TOKEN =
  "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE";

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

  const res = await fetch(`${baseUrl}/college/dashboard`, {
    method: "GET",
    headers: {
      Authorization: COLLEGE_TOKEN,
    },
    cache: "no-store",
  });

  const payload = await res.json().catch(() => null);

  if (!res.ok || !payload?.success) {
    throw new Error(payload?.message || "Failed to fetch dashboard");
  }

  return payload.data;
}
