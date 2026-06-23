"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyDashboardAction from "../actions/get-company-dashboard.action";

export function useCompanyDashboard() {
  return useQuery({
    queryKey: ["company-dashboard"],
    queryFn: async () => {
      // 1. استدعاء الأكشن
      const result = await getCompanyDashboardAction();
      
      // 2. إذا وجد خطأ، ارمِ استثناءً لكي يلتقطه الـ onError في الـ Component
      if (result.error) {
        throw new Error(result.error);
      }
      
      // 3. هذا هو التعديل الأهم: إرجاع الـ data الفعلية فقط
      // الآن الـ Component سيستلم الـ CompanyDashboardData مباشرة
      return result.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}