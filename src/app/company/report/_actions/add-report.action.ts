"use server";

import { getToken } from "@/lib/utils/get-token.util";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export type AddReportPayload = {
  studentId: string;
  periodStart: string;
  periodEnd: string;
  title: string;
  keyAchievements: string;
  challengesFaced: string;
  learningOutcomes: string;
  internalNote?: string;
  tasksCompleted: string;
  attendanceNotes?: string;
  certificateUrl?: string;
  selfAssessment: {
    technicalSkill: number;
    problemSolving: number;
    communication: number;
    initiative: number;
  };
};

type AddReportActionResult =
  | {
      success: true;
      data: unknown;
    }
  | {
      success: false;
      error: string;
      status: number;
    };

function formatErrorValue(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (Array.isArray(value)) {
    const messages = value
      .map((item) => formatErrorValue(item))
      .filter(Boolean);

    return messages.length ? messages.join(", ") : null;
  }

  if (typeof value === "object") {
    const errorObject = value as Record<string, unknown>;
    const nestedDetails =
      formatErrorValue(errorObject.errors) ||
      formatErrorValue(errorObject.details) ||
      formatErrorValue(errorObject.validationErrors);

    if (nestedDetails) {
      return nestedDetails;
    }

    const directMessage =
      formatErrorValue(errorObject.message) ||
      formatErrorValue(errorObject.msg) ||
      formatErrorValue(errorObject.error);

    if (directMessage) {
      const field =
        formatErrorValue(errorObject.field) ||
        formatErrorValue(errorObject.path) ||
        formatErrorValue(errorObject.property);

      return field ? `${field}: ${directMessage}` : directMessage;
    }

    const entries = Object.entries(errorObject)
      .map(([key, item]) => {
        const message = formatErrorValue(item);
        return message ? `${key}: ${message}` : null;
      })
      .filter(Boolean);

    return entries.length ? entries.join(", ") : null;
  }

  return null;
}

function getErrorMessage(data: unknown, fallback: string) {
  const formatted = formatErrorValue(data);

  if (formatted) {
    return formatted;
  }

  return fallback;
}

export async function addReportAction(
  internshipId: string,
  values: AddReportPayload,
): Promise<AddReportActionResult> {
  console.log(values,"values")
  const token = await getToken();
  const accessToken = token?.token?.accessToken || token?.token;
  if (!accessToken) {
    console.error("[addReportAction] Unauthorized: missing access token");
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };
  }

  const missingFields = ["studentId", "periodStart", "periodEnd", "title"].filter(
    (field) => {
      const value = values[field as keyof AddReportPayload];
      return typeof value !== "string" || !value.trim();
    },
  );

  if (missingFields.length) {
    console.error("[addReportAction] missing required fields", {
      missingFields,
      values,
    });

    return {
      success: false,
      error: `Missing form fields before backend request: ${missingFields.join(
        ", ",
      )}`,
      status: 400,
    };
  }

  try {
    console.log("[addReportAction] JSON body", JSON.stringify(values, null, 2));

    const res = await fetch(
      `${BASE_URL}/internshipreport/internship/${internshipId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `company ${accessToken}`,
        },
        body: JSON.stringify(values),
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const fallback = `Request failed with status ${res.status}`;
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json().catch(() => null);
        console.error("[addReportAction] backend JSON error", {
          status: res.status,
          statusText: res.statusText,
          response: data,
          requestBody: values,
        });

        return {
          success: false,
          error: getErrorMessage(data, fallback),
          status: res.status,
        };
      }

      const message = await res.text().catch(() => "");
      console.error("[addReportAction] backend text error", {
        status: res.status,
        statusText: res.statusText,
        response: message,
        requestBody: values,
      });

      return {
        success: false,
        error: message || fallback,
        status: res.status,
      };
    }

    const contentType = res.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return {
        success: true,
        data: await res.json(),
      };
    }

    return {
      success: true,
      data: null,
    };
  } catch (error) {
    console.error("[addReportAction] request failed", error);

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to submit report. Please try again.",
      status: 500,
    };
  }
}
