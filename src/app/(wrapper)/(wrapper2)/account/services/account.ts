"use server";

import { getServerToken } from "@/lib/utils/get-token";
import { revalidatePath } from "next/cache";

const API_BASE = "https://exam.elevateegy.com/api/v1";

async function callApi(path: string, method: "PUT" | "DELETE" | "PATCH", body?: any) {
  const token = await getServerToken();
  if (!token?.accessToken) {
    return { ok: false, message: "Unauthorized" };
  }

  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        token: token.accessToken,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || "Request failed";
      return { ok: false, message: msg };
    }
    return { ok: true, data };
  } catch (e: any) {
    return { ok: false, message: e?.message || "Network error" };
  }
}

/** تحديث بيانات البروفايل */
export async function updateProfileAction(formData: FormData) {
  console.log("Updating profile with data:", Object.fromEntries(formData.entries()));
  
  const payload = {
    firstName: String(formData.get("firstName") || ""),
    lastName: String(formData.get("lastName") || ""),
    username: String(formData.get("username") || ""),
    phone: String(formData.get("phone") || ""),
  };

  const res = await callApi("/auth/editProfile", "PUT", payload);
  console.log(res);
  
  if (res.ok) revalidatePath("/account");
  return res;
}

/** تحديث الباسورد */
export async function updatePasswordAction(formData: FormData) {
  const payload = {
    oldPassword: String(formData.get("currentPassword") || ""),
    password: String(formData.get("newPassword") || ""),
    rePassword: String(formData.get("confirmPassword") || ""),
  };

  const res = await callApi("/auth/changePassword", "PATCH", payload);
  if (res.ok) revalidatePath("/account?tab=password");
  return res;
}


export async function deleteAccountAction() {
  const res = await callApi("/auth/deleteMe", "DELETE")
  console.log("deleteAccountAction", res);

  return res
}

