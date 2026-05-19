"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyAction from "../actions/get-company.action";

export function useCompany(companyId: string) {
  return useQuery({
    queryKey: ["university-company-profile", companyId],
    queryFn: () => getCompanyAction(companyId),
    enabled: !!companyId,
  });
}
