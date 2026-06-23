"use server";

import { getToken } from "@/lib/utils/get-token.util";

export default async function getApplicationDetailsAction(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const token = await getToken();
    
    console.log(token?.token);

    if (!token) {
      return { error: "Unauthorized: No token found" };
    }

    const response = await fetch(`${baseUrl}/application/${id}`, {
      method: "GET",
      headers: {
        Authorization: `company ${token.token}`,
      },
      cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
        data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`;
      
      return { error: message };
    }

    // النجاح
    return { success: true, data: data.data };

  } catch (error) {
    // التقاط أي مشكلة تقنية غير متوقعة
    return { error: "Failed to fetch application details. Please try again." };
  }
}