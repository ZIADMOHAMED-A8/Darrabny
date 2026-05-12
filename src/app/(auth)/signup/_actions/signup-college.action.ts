"use server";

import type { CollegeSignupRequestValues } from "@/lib/schemas/auth/college-signup.schema";

export async function signupCollegeAction(values: CollegeSignupRequestValues) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/college/signup`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  const data = await response.json().catch(() => null);
  console.log(data);
  
  if (!response.ok) {
    throw {
      message: data?.msg || "College signup failed",
      fieldErrors: data?.fieldErrors,
      status: response.status,
    };
  }

  return data;
}