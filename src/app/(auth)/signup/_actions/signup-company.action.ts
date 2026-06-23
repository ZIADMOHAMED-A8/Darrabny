"use server";

import { CompanySignupValues } from "@/lib/schemas/auth/company-signup.schema";

export async function signupCompanyAction(values: CompanySignupValues) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/company/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const fieldErrors = data?.fieldErrors || data?.errors;

    throw new Error(
      fieldErrors?.map((e: any) => e.message).join("\n") ||
      data?.message ||
      "Signup failed"
    );
  }

  return data;
}