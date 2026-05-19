"use server";

import { getToken } from "@/lib/utils/get-token.util";

export type EndorsementDecision = "approved" | "rejected";

type RespondResponse<TData = unknown> = {
  success: boolean;
  message?: string;
  data?: TData;
};

export default async function respondToEndorsementRequestAction({
  id,
  decision,
}: {
  id: string;
  decision: EndorsementDecision;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const res = await fetch(
    `${baseUrl}/college/respondToEndorsementRequest/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `college ${token?.token}`,
      },
      body: JSON.stringify({ status: decision}),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to respond to endorsement request");
  }

  return (await res.json()) as RespondResponse;
}
