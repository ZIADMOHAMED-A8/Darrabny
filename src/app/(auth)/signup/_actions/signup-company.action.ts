"use server";

import { CompanySignupValues } from "@/lib/schemas/auth/company-signup.schema";

type SignupErrorResponse = {
  fieldErrors?: Array<{ message?: string }>;
  errors?: Array<{ message?: string }>;
  message?: string;
};

export async function signupCompanyAction(values: CompanySignupValues) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/company/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  const data = (await response.json().catch(() => null)) as SignupErrorResponse | null;

  if (!response.ok) {
    const fieldErrors = data?.fieldErrors || data?.errors;

    throw new Error(
      fieldErrors?.map((error) => error.message).filter(Boolean).join("\n") ||
      data?.message ||
      "Signup failed"
    );
  }

  return data;
}
