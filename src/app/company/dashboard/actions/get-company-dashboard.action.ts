"use server";

import { getToken } from "@/lib/utils/get-token.util";

// التعريفات الخاصة بك كما هي...
export type CompanyDashboardData = { /* ... */ };

export default async function getCompanyDashboardAction() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = await getToken();
    
    if (!token) {
      return { error: "Unauthorized: No token found" };
    }

    const res = await fetch(`${baseUrl}/company/dashboard`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: `company ${token.token}`,
      },
    });

    const payload = await res.json().catch(() => null);

    if (!res.ok) {
      return { 
        error: payload?.message || `Failed to fetch company dashboard, status: ${res.status}` 
      };
    }

    return { success: true, data: payload as CompanyDashboardData };

  } catch (error) {
    return { error: "An unexpected error occurred while fetching dashboard data." };
  }
}