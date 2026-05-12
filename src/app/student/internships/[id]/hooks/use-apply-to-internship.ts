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
    mutationFn: ({
      internshipId,
      coverLetter = "",
      skills = [],
    }: ApplyToInternshipVariables) =>
      applyToInternshipAction(internshipId, { coverLetter, skills }),
  });
}
