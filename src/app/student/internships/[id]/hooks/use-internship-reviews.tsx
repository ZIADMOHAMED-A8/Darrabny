"use client";

import { useQuery } from "@tanstack/react-query";
import getInternshipReviewsAction from "../actions/get-internship-reviews";

export function useInternshipReviews(id: string) {
  return useQuery({
    queryKey: ["internship-reviews", id],

    queryFn: () => getInternshipReviewsAction(id),

    enabled: !!id,

    staleTime: 1000 * 60 * 5,
  });
}