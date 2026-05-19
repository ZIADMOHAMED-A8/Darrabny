"use client";

import { useQuery } from "@tanstack/react-query";
import getPartnersAction from "../actions/get-partners.action";

export function usePartners(page: number = 1) {
  return useQuery({
    queryKey: ["university-partners", page],
    queryFn: () => getPartnersAction(page),
  });
}
