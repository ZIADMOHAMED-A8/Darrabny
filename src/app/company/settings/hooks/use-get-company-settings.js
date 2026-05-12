"use client";

import { useQuery } from "@tanstack/react-query";
import { getCompanySettingsAction } from "../_actions/get-company-settings.action";

const COMPANY_SETTINGS_QUERY_KEY = ["companySettings"];

export function useGetCompanySettings() {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: COMPANY_SETTINGS_QUERY_KEY,
    queryFn: () => getCompanySettingsAction(),
  });

  return {
    data,
    error,
    isLoading,
    isError,
    refetch,
  };
}
