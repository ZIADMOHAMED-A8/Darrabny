"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyProfileAction from "../actions/get-company-profile.action";

export function useCompanyProfile() {
  return useQuery({
    queryKey: ["company-profile"],
    queryFn: (()=>getCompanyProfileAction()),
  });
}