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
      Authorization: "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "Failed to fetch pending endorsements");
  }

  return (await res.json()) as PendingEndorsementsResponse<unknown[]>;
}
