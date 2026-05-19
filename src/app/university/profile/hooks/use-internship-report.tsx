"use client";

import { useQuery } from "@tanstack/react-query";
import getInternshipReportAction from "../actions/get-internship-report.action";

export function useInternshipReport(reportId: string) {
  return useQuery({
    queryKey: ["internship-report", reportId],
    queryFn: () => getInternshipReportAction(reportId),
    staleTime: 1000 * 60 * 5,
    enabled: !!reportId,
  });
}
