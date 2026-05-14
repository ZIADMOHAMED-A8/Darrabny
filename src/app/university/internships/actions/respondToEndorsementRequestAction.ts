"use server";

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

  const res = await fetch(
    `${baseUrl}/college/respondToEndorsementRequest/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "college eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZjBjZWNhMjBhZjJjMTVhMjUwYmEwZCIsInJvbGUiOiJjb2xsZWdlIiwiaWF0IjoxNzc4NjY5OTcyLCJleHAiOjE3NzkyNzQ3NzJ9.vI6CzAaxVY1jGNbUmVt3KrLKx73Z-2zBI5AW3RDesPE",
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
