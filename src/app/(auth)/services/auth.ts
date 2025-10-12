"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ForgotPasswordValues,
  registerSchema,
  RegisterValues,
} from "@/lib/schemas/auth"

const API_BASE = "https://exam.elevateegy.com/api/v1";

async function callApi(path: string, method: "POST" | "PUT" | "DELETE" | "PATCH", body?: any) {
  // const token = await getServerToken();
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
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

export async function createAccountAction(values: RegisterValues) {
  console.log("createAccountAction", values)

  const parsed = registerSchema.safeParse(values)
  if (!parsed.success) {
    return { ok: false, message: "Validation failed", errors: parsed.error }
  }

  const payload = {
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
    email: values.email,
    phone: `${values.phone}`,
    password: values.password,
    rePassword: values.confirmPassword,
  }

  const res = await callApi("/auth/signup", "POST", payload)
  console.log("createAccountAction-res", res)

  if (res.ok) {
    redirect("/login")
  }
  return res
}

// export async function forgetPasswordAction(formData: FormData) {
//     console.log("forgetPasswordAction", Object.fromEntries(formData.entries()));
//     const email = String(formData.get("email") || "").trim();
//     const payload = { email };
  
//     const res = await callApi("/auth/forgotPassword", "POST", payload);
//     console.log("forgetPasswordAction-res", res);
  
//     if (res.ok) {

//       cookies().set("reset_email", email, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "lax",
//         path: "/",
//       });
//       redirect("/otp");
//     }
//     return res;
//   }

export async function forgetPasswordAction(values: ForgotPasswordValues) {
  console.log("forgetPasswordAction", values)

  const email = String(values.email || "").trim()
  const payload = { email }

  const res = await callApi("/auth/forgotPassword", "POST", payload)
  console.log("forgetPasswordAction-res", res)

  if (res.ok) {
    cookies().set("reset_email", email, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    })
    redirect("/otp")
  }
  return res
}

export async function verifyResetCodeAction(formData: FormData) {
    console.log("verifyResetCodeAction",Object.fromEntries(formData.entries()));
    
    const fromInputs =
      ["otp1","otp2","otp3","otp4","otp5","otp6"]
        .map(n => String(formData.get(n) ?? ""))
        .join("");
  
    const raw =
      String(formData.get("code") || formData.get("resetCode") || fromInputs || "")
        .replace(/\D/g, "");
  
    if (raw.length !== 6) {
      return { ok: false, message: "Invalid or missing 6-digit code" };
    }
  
    const payload = { resetCode: raw };
    const res = await callApi("/auth/verifyResetCode", "POST", payload);
    console.log("verifyResetCodeAction-res",res);
    
  
    if (res.ok) {
        console.log();
        
      redirect("/create-pass");
    }
    return res;
  }

export async function resetPasswordAction(formData: FormData) {
    console.log("resetPasswordAction called");
    
    console.log("resetPasswordAction", Object.fromEntries(formData.entries()));
    const cookieStore = cookies();
  
    const emailFromCookie = cookieStore.get("reset_email")?.value || "";

    const email = emailFromCookie;
  
    const newPassword = String(formData.get("newPassword") || formData.get("password") || "");
    const rePassword = String(formData.get("rePassword") || formData.get("confirmPassword") || "");
  
    if (!email) return { ok: false, message: "Reset email not found. Please start again." };

  
    if (!newPassword) return { ok: false, message: "New password is required" };
    if (rePassword && newPassword !== rePassword) return { ok: false, message: "Passwords do not match" };
  
    const payload = { email, newPassword };
    console.log("resetPasswordAction-payload", payload);
    
    const res = await callApi("/auth/resetPassword", "PUT", payload);
    console.log("resetPasswordAction-res", res);
  
    if (res.ok) {
      cookieStore.delete("reset_email");
      cookieStore.delete("reset_verified");
      redirect("/login");
    }
    return res;
}
 

export async function resendCodeAction() {
  console.log("resendCodeAction called");

  const cookieStore = cookies();
  const email = cookieStore.get("reset_email")?.value?.trim() || "";

  if (!email) {
    return { ok: false, message: "Reset email not found. Please start again." };
  }

  const payload = { email };

  const res = await callApi("/auth/forgotPassword", "POST", payload);
  console.log("resendCodeAction-res", res);

  

  return res;
}
