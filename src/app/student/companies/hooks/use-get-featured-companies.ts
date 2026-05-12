"use client";

import { useQuery } from "@tanstack/react-query";
import getFeaturedCompaniesAction from "../actions/get-featured-companies.action";

export default function useGetFeaturedCompanies() {
  return useQuery({
    queryKey: ["featured-companies"],
    queryFn: () => getFeaturedCompaniesAction(),
  });
}
