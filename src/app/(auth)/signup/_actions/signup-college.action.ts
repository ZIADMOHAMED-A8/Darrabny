"use server";

import type { CollegeSignupRequestValues } from "@/lib/schemas/auth/college-signup.schema";

type SignupErrorResponse = {
  fieldErrors?: Array<{ message?: string }>;
  errors?: Array<{ message?: string }>;
  message?: string;
};

export async function signupCollegeAction(values: CollegeSignupRequestValues) {
  const url = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/college/signup`;
  const response = await fetch(
    url,
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
