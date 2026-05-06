"use server";

import { getToken } from "@/lib/utils/get-token.util";

type Params = {
  q?: string;
  technicalSkills?: string;
  workingTime?: string;
  durationInMonths?: number;
  internshipLocation?: string;
};

export default async function searchInternshipsAction(params: Params) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const query = new URLSearchParams();

  if (params.q) query.append("q", params.q);
  if (params.technicalSkills)
    query.append("technicalSkills", params.technicalSkills);
  if (params.workingTime)
    query.append("workingTime", params.workingTime);
  if (params.durationInMonths)
    query.append("durationInMonths", String(params.durationInMonths));
  if (params.internshipLocation)
    query.append("internshipLocation", params.internshipLocation);

  const res = await fetch(
    `${baseUrl}/internship?${query.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `company ${token.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.message || "Failed to search internships");
  }

  return data.data;
}