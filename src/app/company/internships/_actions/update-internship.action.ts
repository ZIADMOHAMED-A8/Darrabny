"use server";
import { getToken } from "@/lib/utils/get-token.util";

export async function updateInternshipAction(id: string, values: FormData) {
  const token = await getToken();

  const body = Object.fromEntries(values.entries());

  const res = await fetch(`http://localhost:5000/Internship/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `company ${token?.token}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
}