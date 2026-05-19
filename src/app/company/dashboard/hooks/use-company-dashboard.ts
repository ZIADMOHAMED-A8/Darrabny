"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyDashboardAction from "../actions/get-company-dashboard.action";

export function useCompanyDashboard() {
  return useQuery({
    queryKey: ["company-dashboard"],
    queryFn: () => getCompanyDashboardAction(),
    staleTime: 1000 * 60 * 5,
  });
}
