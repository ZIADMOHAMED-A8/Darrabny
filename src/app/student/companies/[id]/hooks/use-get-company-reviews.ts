"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyReviewsAction from "../actions/get-company-reviews.action";

export default function useGetCompanyReviews(id: string) {
  return useQuery({
    queryKey: ["company-reviews", id],
    queryFn: () => getCompanyReviewsAction(id),
    enabled: Boolean(id),
  });
}
