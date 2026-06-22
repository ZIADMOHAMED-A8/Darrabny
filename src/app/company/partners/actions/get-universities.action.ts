"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getUniversitiesAction() {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/college/universities`,
    {
      headers: {
        Authorization: `company ${token?.token}`,
      },
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.data;
}