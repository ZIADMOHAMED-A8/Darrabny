"use server";

import type { CollegeSignupRequestValues } from "@/lib/schemas/auth/college-signup.schema";

export async function signupCollegeAction(values: CollegeSignupRequestValues) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL || 'localhost:3000'} /college/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  const data = await response.json().catch(() => null);
  console.log(data);

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