"use server";

import type { CollegeSignupRequestValues } from "@/lib/schemas/auth/college-signup.schema";

type SignupErrorResponse = {
  fieldErrors?: Array<{ message?: string }>;
  errors?: Array<{ message?: string }>;
  message?: string;
};

export async function signupCollegeAction(values: CollegeSignupRequestValues) {
  try {
    // تم إزالة المسافة الزائدة قبل /college
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/college/signup`,
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

      // تجميع رسالة الخطأ
      const errorMessage =
        fieldErrors?.map((e: any) => e.message).join("\n") ||
        data?.message ||
        "Signup failed";

      // ترجيع الإيرور كأوبجكت
      return { error: errorMessage };
    }

    // ترجيع حالة النجاح مع البيانات
    return { success: true, data };

  } catch (error) {
    // التقاط أي مشكلة في الاتصال أو النتوورك
    return { error: "حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً." };
  }
}
