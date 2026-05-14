"use client";

import { useQuery } from "@tanstack/react-query";
import getCollegeReportsAction from "../actions/get-college-reports.action";

export function useCollegeReports() {
  return useQuery({
    queryKey: ["college-reports"],
    queryFn: ()=>{return getCollegeReportsAction()},
    staleTime: 1000 * 60 * 5,
  });
}