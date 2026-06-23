"use server";

import { CompanySignupValues } from "@/lib/schemas/auth/company-signup.schema";

export async function signupCompanyAction(values: CompanySignupValues) {
  try {
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

      // تجميع رسالة الخطأ
      const errorMessage = 
        fieldErrors?.map((e: any) => e.message).join("\n") ||
        data?.message ||
        "Signup failed";

      // ترجيع الإيرور كأوبجكت بدل throw
      return { error: errorMessage };
    }

    // ترجيع حالة النجاح مع البيانات
    return { success: true, data };

  } catch (error) {
    // التقاط أي مشكلة في الاتصال (زي إن السيرفر يكون واقع)
    return { error: "حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً." };
  }
}