"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyInternshipsAction from "../actions/get-company-internships.action";

export function useCompanyInternships() {
  return useQuery({
    queryKey: ["company-internships"],
    queryFn: ()=>{return getCompanyInternshipsAction()},
  });
}