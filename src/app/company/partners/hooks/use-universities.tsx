"use client";

import { useQuery } from "@tanstack/react-query";
import getUniversitiesAction from "../actions/get-universities.action";

export function useUniversities() {
  return useQuery({
    queryKey: ["universities"],
    queryFn: ()=>{return getUniversitiesAction()},

  });
}