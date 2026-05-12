"use server";

type PendingEndorsementsResponse<TData = unknown> = {
  success: boolean;
  message?: string;
  data: TData;
};

export default async function getPendingEndorsementsAction() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  const res = await fetch(`${baseUrl}/college/pending-endorsements`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc3ODE0MjQ3LCJleHAiOjE3Nzg0MTkwNDd9.k7PmBdA9bhGC2X-BRefk4FFI9smRdt3nUiqFeuXJBUY",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to fetch pending endorsements");
  }

  return (await res.json()) as PendingEndorsementsResponse<unknown[]>;
}
