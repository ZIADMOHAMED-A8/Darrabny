"use client";

import { useMutation } from "@tanstack/react-query";
import applyToInternshipAction from "../actions/apply-to-internship.action";

type ApplyToInternshipVariables = {
  internshipId: string;
  coverLetter?: string;
  skills?: string[];
};

export default function useApplyToInternship() {
  return useMutation({
    mutationFn: async ({
      internshipId,
      coverLetter = "",
      skills = [],
    }: ApplyToInternshipVariables) => {
      // 1. بننادي الأكشن ونستنى النتيجة
      const result = await applyToInternshipAction(internshipId, { coverLetter, skills });

      // 2. لو الأكشن رجّع أوبجكت فيه إيرور، بنرميه هنا كـ Error حقيقي
      // ده هيخلي React Query يفهم إن العملية فشلت ويروح لـ onError
      if (result?.error) {
        throw new Error(result.error);
      }

      // 3. لو مفيش إيرور، هنرجع النتيجة عادي عشان تروح لـ onSuccess
      return result;
    },
  });
}