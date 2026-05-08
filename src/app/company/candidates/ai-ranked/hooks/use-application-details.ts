"use client";

import { useQuery } from "@tanstack/react-query";
import getApplicationDetailsAction from "../actions/get-application-details";


export function useApplicationDetails(id: string) {
  return useQuery({
    queryKey: ["application-details", id],

    queryFn: () => getApplicationDetailsAction(id),

    enabled: !!id, // ميضربش لو مفيش id

    staleTime: 1000 * 60 * 5, // 5 دقايق كاش
  });
}