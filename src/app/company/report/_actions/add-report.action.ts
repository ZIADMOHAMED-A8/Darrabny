"use server";

import { getToken } from "@/lib/utils/get-token.util";
import { reportSchema } from "@/lib/schemas/report/report.schema";

const REPORT_API_URL = "http://localhost:5000/report/evaluation";

export async function addReportAction(payload: unknown) {
  const validatedPayload = reportSchema.parse(payload);
  const token = await getToken();
  const accessToken = token?.token?.accessToken || token?.token;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(REPORT_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `company ${accessToken}`,
    },
    body: JSON.stringify(validatedPayload),
    cache: "no-store",
  });
 
  console.log(res);
  
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to add report");
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json();
  }

  return null;
}
