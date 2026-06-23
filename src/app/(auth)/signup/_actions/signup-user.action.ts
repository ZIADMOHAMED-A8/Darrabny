"use server";

import { SignupValues } from "@/lib/schemas/auth/signup.schema";

export async function signupAction(values: SignupValues) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json().catch(() => null);
    console.log(data, "sign up data");

    if (!response.ok) {
      const fieldErrors = data?.fieldErrors || data?.errors;
      const errorMessage = 
        fieldErrors?.map((e: any) => e.message).join("\n") ||
        data?.message ||
        "Signup failed";

      return { error: errorMessage };
    }

    return { success: true, data };

  } catch (error) {

    return { error: "حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً." };
  }
}