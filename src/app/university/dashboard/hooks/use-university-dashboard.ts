"use client";

import { useQuery } from "@tanstack/react-query";
import getUniversityDashboardAction from "../actions/get-university-dashboard.action";

export function useUniversityDashboard() {
  return useQuery({
    queryKey: ["university-dashboard"],
    queryFn: () => getUniversityDashboardAction(),
    staleTime: 1000 * 60 * 5,
  });
}
