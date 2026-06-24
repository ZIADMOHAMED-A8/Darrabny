"use client";

import { useMutation } from "@tanstack/react-query";
import applyToInternshipAction from "../actions/apply-to-internship.action";
import toast from "react-hot-toast";

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
      const result = await applyToInternshipAction(internshipId, {
        coverLetter,
        skills,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },

    onSuccess: () => {
      toast.success("Applied Successfully", {
        duration: 5000,

        style: {
          minWidth: "380px",
          padding: "16px 18px",
          borderRadius: "16px",
          background: "#F8FBFF",
          color: "#0F172A",
          border: "1px solid #BFDBFE",
          boxShadow: "0 12px 30px rgba(26, 111, 168, 0.12)",
          fontSize: "14px",
          fontWeight: "500",
        },

        iconTheme: {
          primary: "#1A6FA8",
          secondary: "#FFFFFF",
        },
      });
    },
  });
}