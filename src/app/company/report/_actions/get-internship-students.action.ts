"use server";

import { getToken } from "@/lib/utils/get-token.util";
import type { StudentPlacement } from "../_types/report";

type RawStudent = {
  _id?: unknown;
  id?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  fullName?: unknown;
  name?: unknown;
  email?: unknown;
};

type RawPlacement = {
  _id?: unknown;
  id?: unknown;
  placementId?: unknown;
  student?: unknown;
  studentId?: unknown;
  firstName?: unknown;
  lastName?: unknown;
  fullName?: unknown;
  name?: unknown;
  email?: unknown;
  currentPerformance?: unknown;
};

export async function getInternshipStudents(internshipId: string) {
  const token = await getToken();
  const accessToken = token?.token?.accessToken || token?.token;

  if (!accessToken) {
    throw new Error("Unauthorized");
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
  const res = await fetch(`${baseUrl}/internship/${internshipId}/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `company ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 404) {
      return [] as StudentPlacement[];
    }

    const message = await res.text();
    throw new Error(message || "Failed to get internship students");
  }

  const payload = await res.json();
  console.log(payload);

  const rawPlacements =
    payload?.data?.placements || payload?.data || payload || [];

  if (!Array.isArray(rawPlacements)) {
    return [] as StudentPlacement[];
  }

  return rawPlacements
    .map((placement: RawPlacement) => {
      const student =
        typeof placement?.studentId === "object" && placement?.studentId
          ? (placement.studentId as RawStudent)
          : placement || {};
      const fullName =
        [student?.firstName, student?.lastName].filter(Boolean).join(" ") ||
        student?.fullName ||
        placement?.fullName ||
        student?.name ||
        placement?.name ||
        "Unknown Student";

      return {
        placementId: String(
          placement?.placementId || placement?._id || placement?.id || "",
        ),
        studentId: String(
          student?._id ||
            student?.id ||
            placement?.student ||
            placement?.studentId ||
            "",
        ),
        studentName: String(fullName),
        studentEmail: String(student?.email || placement?.email || "N/A"),
        currentPerformance: Number(placement?.currentPerformance ?? 0),
      };
    })
    .filter((item: StudentPlacement) => Boolean(item.placementId));
}
