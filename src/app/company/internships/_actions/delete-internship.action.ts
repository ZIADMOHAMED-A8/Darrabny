"use server";

import { getToken } from "@/lib/utils/get-token.util";

export async function deleteInternshipAction(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = await getToken();

    if (!token) {
      return { error: "Unauthorized: No token found" };
    }

    const response = await fetch(`${baseUrl}/Internship/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `company ${token.token}`,
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`;

      return { error: message };
    }

    // نجاح عملية الحذف
    return { success: true, data };

  } catch (error) {
    // التقاط أي خطأ في الاتصال
    return { error: "Failed to delete internship. Please try again." };
  }
}