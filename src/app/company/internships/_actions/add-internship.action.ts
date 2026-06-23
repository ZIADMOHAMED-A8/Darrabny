"use server";

import { getToken } from "@/lib/utils/get-token.util";

export async function addInternshipAction(formData: FormData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = await getToken();

    if (!token) {
      return { error: "Unauthorized: No token found" };
    }

    console.log("token from action", token.token);

    const response = await fetch(`${baseUrl}/Internship/add`, {
      method: "POST",
      body: formData,
      headers: {
        // ملاحظة: لا تضع Content-Type: multipart/form-data هنا
        // لأن المتصفح/Node سيقوم بوضع الـ Boundary الصحيح تلقائياً
        Authorization: `company ${token.token}`,
      },
    });

    const data = await response.json().catch(() => null);

    console.log("STATUS:", response.status);
    console.log("BACKEND RESPONSE:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      const message =
        data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`;

      console.error("UPLOAD ERROR:", data);
      
      // إرجاع الخطأ بدلاً من رميه (throw)
      return { error: message };
    }

    // النجاح
    return { success: true, data };

  } catch (error) {
    // التقاط أي مشكلة تقنية (مثل انقطاع الاتصال بالسيرفر)
    return { error: "Failed to add internship. Please try again later." };
  }
}