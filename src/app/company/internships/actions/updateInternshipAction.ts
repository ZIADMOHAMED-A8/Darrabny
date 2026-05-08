"use server";
import { getToken } from "@/lib/utils/get-token.util";

export type UpdateInternshipPayload = {
  internshipTittle: string;
  internshipDescription: string;
  internshipLocation: string;
  workingTime: string;
  startDate: string;
  durationInMonths: number;
  closed: boolean;
  technicalSkills: string[];
  softSkills: string[];
  thumbnail?: string | null;
};

export default async function updateInternshipAction(
  id: string,
  payload: FormData,
) {
  Array.from(payload.entries()).forEach(([key, value]) => {
    console.log(key, value);
  });
  const baseUrl =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  console.log("token from action", token.token);

  const response = await fetch(`${baseUrl}/Internship/${id}`, {
    method: "PATCH",
    body:payload,
    headers: {
      Authorization: `company ${token.token}`,
    },
  });

  const data = await response.json().catch(() => null);

  console.log("STATUS:", response.status);
  console.log("BACKEND RESPONSE:", JSON.stringify(data, null, 2));

  if (!response.ok) {
    const message =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status}`;

    console.error("UPLOAD ERROR:", data);

    throw new Error(message);
  }

  return data;
}

