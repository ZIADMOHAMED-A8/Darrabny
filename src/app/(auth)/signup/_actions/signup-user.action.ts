"use server";

import { SignupValues } from "@/lib/schemas/auth/signup.schema";

export async function signupAction(values: SignupValues) {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw {
      message: data?.message || "Signup failed",
      fieldErrors: data?.fieldErrors || data?.errors,
      status: response.status,
    };
  }

  return data;
}
