"use client";

import { useQuery } from "@tanstack/react-query";
import getCompanyInternshipsAction from "../actions/get-company-internships.action";

export default function useGetCompanyInternships(id: string) {
  return useQuery({
    queryKey: ["company-internships", id],
    queryFn: () => getCompanyInternshipsAction(id),
    enabled: Boolean(id),
  });
}
