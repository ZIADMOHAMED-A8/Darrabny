"use client";

import { useQuery } from "@tanstack/react-query";
import getStudentProfileAction from "../actions/get-student-profile.action";

export function useStudentProfile(id: string) {
  return useQuery({
    queryKey: ["student-profile", id],
    queryFn: () => getStudentProfileAction(id),
    enabled: !!id,
  });
}