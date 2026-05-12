"use client";

import { useQuery } from "@tanstack/react-query";
import { DUMMY_APPLY_PROFILE } from "../[id]/_data/apply-profile.dummy";

export type ApplyProfilePayload = {
  user: unknown;
  skills: unknown;
  resume: unknown;
};

async function getApplyProfile(): Promise<ApplyProfilePayload> {
  try {
    const res = await fetch("/api/student/apply-info", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load application profile");
    }

    return res.json();
  } catch {
    // Fallback until backend API is fully ready.
    return DUMMY_APPLY_PROFILE;
  }
}

export default function useGetApplyProfile(enabled: boolean) {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["apply-profile"],
    queryFn: () => getApplyProfile(),
    enabled,
  });

  return { data, error, isLoading, isError, refetch, isFetching };
}

