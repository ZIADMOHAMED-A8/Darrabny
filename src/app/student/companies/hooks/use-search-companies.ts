"use client";

import { useQuery } from "@tanstack/react-query";
import searchCompaniesAction from "../actions/search-companies.action";

type UseSearchCompaniesParams = {
  q?: string;
  industry?: string;
  page?: number;
  limit?: number;
};

export default function useSearchCompanies({
  q = "",
  industry,
  page = 1,
  limit = 10,
}: UseSearchCompaniesParams = {}) {
  return useQuery({
    queryKey: ["search-companies", q, industry ?? "", page, limit],
    queryFn: () => searchCompaniesAction({ q, industry, page, limit }),
    enabled: q.trim().length > 0,
  });
}
