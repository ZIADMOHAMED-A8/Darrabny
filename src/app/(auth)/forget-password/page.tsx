"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { resetPasswordConfirm, sendForgetPasswordEmail } from "@/lib/api/auth.api";

// Shadcn UI Components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Icons
import { Mail, Lock, Eye, EyeOff, KeyRound, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();

  // States
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Form Data
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const ICON_BTN = "absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700";

  // Step 1: Send Email
  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      await sendForgetPasswordEmail(email);
      setSuccessMsg("A 4-digit verification code has been sent to your email.");
      setStep(2);
    } catch (err: any) {
      setError(err.message || "An error occurred, please check your email address.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      await resetPasswordConfirm({ email, code, newPassword });
      setSuccessMsg("Password reset successfully! Redirecting...");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Invalid or expired verification code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 font-sans bg-cover bg-center">
      <Card className="w-full max-w-[520px] rounded-[20px] border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
        <CardContent className="px-10 pb-10 pt-9">
          
          {/* Header */}
          <div className="mb-8 text-center">
            <h2 className="text-center text-3xl font-semibold text-[#0B2A4A] mb-2">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              {step === 1
                ? "Enter your email address and we'll send you a 4-digit code."
                : `Enter the 4-digit code sent to ${email}`}
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 rounded-[12px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 text-center">
              {successMsg}
            </div>
          )}

          {/* Step 1 Form */}
          {step === 1 && (
            <form onSubmit={handleSendEmail} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#0B2A4A]">
                  Email address
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-12 rounded-[12px] pl-11 border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                    dir="ltr"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || !email}
                className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE]"
              >
                {loading ? "Sending..." : "Send Code"}
              </Button>

              <div className="mt-6 flex justify-center">
                <Button
                  asChild
                  type="button"
                  className="text-sm text-[#0A79C9] hover:underline bg-transparent shadow-none p-0 h-auto"
                >
                  <Link href="/login" className="flex items-center gap-1.5">
                    <ArrowLeft className="h-4 w-4" /> Back to Login
                  </Link>
                </Button>
              </div>
            </form>
          )}

          {/* Step 2 Form */}
          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="code" className="text-sm font-medium text-[#0B2A4A]">
                  Verification Code (OTP)
                </label>
                <div className="relative mt-2">
                  <KeyRound className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="code"
                    type="text"
                    required
                    maxLength={4} // تعديل لـ 4 أرقام هنا
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="----"
                    className="h-12 rounded-[12px] pl-11 text-center text-lg tracking-[0.5em] border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium text-[#0B2A4A]">
                  New Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="newPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="h-12 rounded-[12px] pl-11 pr-11 border-black/10 bg-white focus-visible:ring-4 focus-visible:ring-[#0A79C9]/20"
                    dir="ltr"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={ICON_BTN}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading || code.length < 4 || !newPassword}
                className="h-12 w-full rounded-[12px] bg-[#0A79C9] text-white hover:bg-[#0868AE] mt-2"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </Button>

              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setSuccessMsg("");
                    setError("");
                    setCode("");
                  }}
                  className="text-sm text-slate-500 hover:text-[#0B2A4A] hover:underline bg-transparent shadow-none p-0 h-auto"
                >
                  Change email address?
                </Button>
              </div>
            </form>
          )}

        </CardContent>
      </Card>
    </div>
  );
}