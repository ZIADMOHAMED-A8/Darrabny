// lib/apis/auth.api.ts

// حط اللينك الأساسي للباك إند بتاعك هنا
const BASE_URL = process.env.NEXT_PUBLIC_Base_API_URL || 'http://localhost:5000';

export const sendForgetPasswordEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}/auth/forgetPassword`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'حدث خطأ أثناء إرسال البريد');
  }

  return data;
};
export const resetPasswordConfirm = async (payload: { email: string; code: string; newPassword: string }) => {
  const cleanCode = payload.code.trim().replace(/\s/g, ''); // تنظيف الكود من أي مسافات

  const response = await fetch(`${BASE_URL}/auth/resetPassword`, {
    method: 'PATCH', // ممتاز إنك ظبطتها على الـ Method بتاعتك
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...payload, code: cleanCode }), // ابعت الكود النظيف
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || 'الكود غير صحيح أو منتهي الصلاحية');
  }

  return data;
};