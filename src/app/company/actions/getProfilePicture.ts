"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getProfilePicture() {
  try {
    const token = await getToken();
    
    // 1. تبديل الـ throw بـ return
    if (!token) {
      return { error: "Unauthorized: No token found" };
    }
    
    console.log('token zzz', token);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/company/logo`, {
      method: 'GET',
      headers: {
        Authorization: `company ${token.token}`,
      }
    });

    // استخدام catch عشان لو الرد مكانش JSON سليم ما يضربش
    const data = await res.json().catch(() => null);

    // 2. تبديل الـ throw بـ return
    if (!res.ok) {
      return { error: data?.message ?? "Failed to get profile picture" };
    }

    // 3. ترجيع حالة النجاح
    return { success: true, data };

  } catch (error) {
    // 4. حماية من سقوط النتوورك أو الباك إند
    return { error: "حدث خطأ في الاتصال بالخادم، يرجى المحاولة لاحقاً." };
  }
}