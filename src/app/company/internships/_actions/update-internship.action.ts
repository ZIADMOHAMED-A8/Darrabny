"use server";

import { getToken } from "@/lib/utils/get-token.util";

export async function updateInternshipAction(id: string, formData: FormData) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = await getToken();

    if (!token) {
      return { error: "Unauthorized: No token found" };
    }

    const response = await fetch(`${baseUrl}/Internship/${id}`, {
      method: "PATCH",
      body: formData,
      headers: {
        // لا تضع Content-Type هنا أيضاً عند استخدام FormData
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

    // النجاح في التعديل
    return { success: true, data };
    
  } catch (error) {
    return { error: "Failed to update internship. Please try again later." };
  }
}