"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getCollegeReportsAction() {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${baseUrl}/college/getCollegeInternsReports`,
    {
      method: "GET",
      headers: {
        Authorization: `college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc3ODE0MjQ3LCJleHAiOjE3Nzg0MTkwNDd9.k7PmBdA9bhGC2X-BRefk4FFI9smRdt3nUiqFeuXJBUY`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to fetch reports");
  }

  return data.data;
}