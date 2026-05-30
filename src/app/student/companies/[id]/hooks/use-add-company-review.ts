"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import addCompanyReviewAction, {
  type AddCompanyReviewPayload,
} from "../actions/add-company-review.action";

type AddCompanyReviewVariables = AddCompanyReviewPayload & {
  companyId: string;
  internshipId: string;
};

export default function useAddCompanyReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ internshipId, rating, comment }: AddCompanyReviewVariables) =>
      addCompanyReviewAction(internshipId, { rating, comment }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["company-reviews", variables.companyId],
      });
      queryClient.invalidateQueries({
        queryKey: ["internship-reviews", variables.internshipId],
      });
    },
  });
}
