"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollegeSettingsAction } from "../actions/get-college-settings.action";

export const COLLEGE_SETTINGS_QUERY_KEY = ["college-settings"];

export function useGetCollegeSettings() {
  return useQuery({
    queryKey: COLLEGE_SETTINGS_QUERY_KEY,
    queryFn: () => getCollegeSettingsAction(),
    staleTime: 1000 * 60 * 5,
  });
}
