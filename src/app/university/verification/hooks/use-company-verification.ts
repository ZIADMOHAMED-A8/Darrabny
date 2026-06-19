// hooks/use-company-verification.ts

"use client";

import { useQuery } from "@tanstack/react-query";

import getCompanyVerificationAction from "../actions/get-company-verification.action";

export function useCompanyVerification() {
  return useQuery({
    queryKey: ["company-verification"],

    queryFn: ()=>getCompanyVerificationAction(),
  });
}