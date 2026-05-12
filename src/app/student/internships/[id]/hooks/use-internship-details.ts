"use client";

import { useQuery } from "@tanstack/react-query";
import getInternshipDetailsAction from "../actions/get-internship-details";

export function useInternshipDetails(id: string) {
  return useQuery({
    queryKey: ["internship-details", id],

    queryFn: () => getInternshipDetailsAction(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}