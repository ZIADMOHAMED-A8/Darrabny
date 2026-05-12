"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyDetailsAction from "../actions/get-company-details.action";

export default function useGetCompanyDetails(id: string) {
  return useQuery({
    queryKey: ["company-details", id],
    queryFn: () => getCompanyDetailsAction(id),
    enabled: Boolean(id),
  });
}
