"use client";

import { useQuery } from "@tanstack/react-query";
import searchInternshipsAction from "../actions/search-internships";

export function useSearchInternships(filters: any) {
  return useQuery({
    queryKey: ["search-internships", filters],

    queryFn: () => searchInternshipsAction(filters),

    enabled: !!filters, // يشتغل لما يكون فيه فلتر

    staleTime: 1000 * 60 * 5,
  });
}