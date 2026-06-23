"use server";

import { getToken } from "@/lib/utils/get-token.util";

type ApplyToInternshipPayload = {
  coverLetter?: string;
  skills?: string[];
};

export default async function applyToInternshipAction(
  internshipId: string,
  payload: ApplyToInternshipPayload
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const token = await getToken();

  // 1. تبديل الـ throw بـ return
  if (!token) {
    return { error: "Unauthorized: No token found" };
  }

  try {
    const response = await fetch(
      `${baseUrl}/internship/ApplyToInternship/${internshipId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `user ${token.token.accessToken}`,
        },
        body: JSON.stringify({
          coverLetter: payload.coverLetter || "",
          skills: payload.skills || [],
        }),
        cache: "no-store",
      }
    );

    const data = await response.json().catch(() => null);

    // 2. تبديل الـ throw بـ return
    if (!response.ok) {
      return {
        error:
          data?.message ||
          data?.error ||
          data?.msg ||
          `Request failed with status ${response.status}`,
      };
    }

    // 3. ترجيع حالة النجاح عشان الكلاينت يفهم إن مفيش إيرور
    return { success: true, data: data };

  } catch (error) {
    // 4. أمان إضافي: لو السيرفر الأساسي (Backend) واقع أو في مشكلة في النتوورك
    return { error: "حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً." };
  }
}