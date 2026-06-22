"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function sendInviteAction(payload: {
  universityId: string;
  internshipId: string;
}) {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/company/endorsement-request`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `company ${token?.token}`,
        
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to send invite");
  }
  console.log(data,"data alo")
  return data;
}