"use server";

import { ResetPasswordApi } from "@/lib/api/forgot-password-flow/reset-password.api";

export async function resetPasswordAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const newPassword = String(formData.get("newPassword") ?? "").trim();

  if (!email) {
    throw new Error("Missing email");
  }
  if (!newPassword) {
    throw new Error("Missing new password");
  }

  const res = await ResetPasswordApi({ email, newPassword });

  if (!res || res.message !== "success") {
    const code = (res as any)?.code;
    throw new Error(typeof code === "string" ? code : "Failed to reset password");
  }

  return res;
}

