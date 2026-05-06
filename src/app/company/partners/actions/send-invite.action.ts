"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function sendInviteAction(payload: {
    universityId: string;
    internshipId: string;
}) {
  const token = await getToken();
    console.log(token?.token)
  const res = await fetch(
    "http://localhost:5000/company/endorsement-request",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `company ${token?.token}`,
      },
      body: JSON.stringify(payload),
    }
  );
  console.log(res)

  if (!res.ok) throw new Error(`Failed to send invite with status code ${res.statusText}`);

  return res.json();
}