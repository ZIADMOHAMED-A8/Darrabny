"use server";

import { getToken } from "@/lib/utils/get-token.util";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

type UploadCertificateResult =
  | {
      success: true;
      url: string;
      data: unknown;
    }
  | {
      success: false;
      error: string;
      status: number;
    };

function extractCertificateUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const data =
    root.data && typeof root.data === "object"
      ? (root.data as Record<string, unknown>)
      : root;

  const directKeys = [
    "certificateUrl",
    "certificate",
    "url",
    "secure_url",
    "secureUrl",
    "fileUrl",
  ];

  for (const key of directKeys) {
    const value = data[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  for (const value of Object.values(data)) {
    if (value && typeof value === "object") {
      const nestedUrl = extractCertificateUrl(value);
      if (nestedUrl) {
        return nestedUrl;
      }
    }
  }

  return null;
}

export async function uploadCertificateAction(
  formData: FormData,
): Promise<UploadCertificateResult> {
  const token = await getToken();
  const accessToken = token?.token?.accessToken || token?.token;

  if (!accessToken) {
    console.error("[uploadCertificateAction] Unauthorized: missing access token");
    return {
      success: false,
      error: "Unauthorized",
      status: 401,
    };
  }

  console.log(
    "[uploadCertificateAction] FormData keys",
    Array.from(formData.keys()),
  );

  const res = await fetch(`${BASE_URL}/internshipReport/upload-certificate`, {
    method: "POST",
    headers: {
      Authorization: `company ${accessToken}`,
    },
    body: formData,
    cache: "no-store",
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : await res.text().catch(() => "");

  if (!res.ok) {
    const error =
      data && typeof data === "object"
        ? String(
            (data as Record<string, unknown>).message ||
              (data as Record<string, unknown>).msg ||
              (data as Record<string, unknown>).error ||
              `Certificate upload failed with status ${res.status}`,
          )
        : String(data || `Certificate upload failed with status ${res.status}`);

    console.error("[uploadCertificateAction] upload failed", {
      status: res.status,
      statusText: res.statusText,
      response: data,
      error,
    });

    return {
      success: false,
      error,
      status: res.status,
    };
  }

  const url = extractCertificateUrl(data);
  console.log("[uploadCertificateAction] response", data);
  console.log("[uploadCertificateAction] extracted URL", url);

  if (!url) {
    console.error("[uploadCertificateAction] missing URL in response", data);

    return {
      success: false,
      error: "Certificate uploaded, but no URL was returned.",
      status: 500,
    };
  }

  return {
    success: true,
    url,
    data,
  };
}
