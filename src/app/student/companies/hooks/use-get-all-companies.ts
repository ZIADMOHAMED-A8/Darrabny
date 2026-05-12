"use client";

import { useQuery } from "@tanstack/react-query";
import getAllCompaniesAction from "../actions/get-all-companies.action";

type UseGetAllCompaniesParams = {
  page?: number;
  limit?: number;
};

export default function useGetAllCompanies({
  page = 1,
  limit = 3,
}: UseGetAllCompaniesParams = {}) {
  return useQuery({
    queryKey: ["all-companies", page, limit],
    queryFn: () => getAllCompaniesAction({ page, limit }),
  });
}
