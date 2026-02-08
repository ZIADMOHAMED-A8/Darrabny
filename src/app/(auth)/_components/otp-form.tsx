"use client";

import * as React from "react";
import Countdown from "react-countdown";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/* ----------------------------- helpers ----------------------------- */
function onlyDigits(v: string) {
  return v.replace(/\D/g, "");
}

/* ----------------------------- schema ----------------------------- */
const OtpSchema = z.object({
  otp: z
    .string()
    .transform((v) => onlyDigits(v))
    .refine((v) => /^\d{6}$/.test(v), {
      message: "OTP must be exactly 6 digits",
    }),
});

type OtpValues = z.infer<typeof OtpSchema>;

export default function OtpPage() {
  const [key, setKey] = React.useState(0);
  const [showResend, setShowResend] = React.useState(false);

  // UI digits (6 inputs) + RHF value (single otp string)
  const [digits, setDigits] = React.useState<string[]>(Array(6).fill(""));
  const inputsRef = React.useRef<Array<HTMLInputElement | null>>([]);

  const {
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OtpValues>({
    resolver: zodResolver(OtpSchema),
    defaultValues: { otp: "" },
    mode: "onSubmit",
  });

  function focusIndex(i: number) {
    const el = inputsRef.current[i];
    el?.focus();
    el?.select?.();
  }

  function syncToForm(nextDigits: string[]) {
    const otp = nextDigits.join("");
    // validate on submit only, لكن نخلي القيمة متحدثة
    setValue("otp", otp as any, { shouldDirty: true });
  }

  function setAt(i: number, val: string) {
    setDigits((prev) => {
      const next = [...prev];
      next[i] = val;
      syncToForm(next);
      return next;
    });
  }

  function handleChange(i: number, raw: string) {
    const v = onlyDigits(raw);

    // paste / fast typing
    if (v.length > 1) {
      const slice = v.slice(0, 6).split("");
      const next = Array(6)
        .fill("")
        .map((_, idx) => slice[idx] ?? "");

      setDigits(next);
      syncToForm(next);

      const last = Math.min(slice.length, 6) - 1;
      focusIndex(last >= 0 ? last : 0);
      return;
    }

    setAt(i, v);

    if (v && i < 5) focusIndex(i + 1);
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[i]) {
        setAt(i, "");
        return;
      }
      if (i > 0) {
        focusIndex(i - 1);
        setAt(i - 1, "");
      }
    }

    if (e.key === "ArrowLeft" && i > 0) focusIndex(i - 1);
    if (e.key === "ArrowRight" && i < 5) focusIndex(i + 1);
  }

  const otpError = errors.otp?.message;

  const otpValue = digits.join("");
  const isComplete = otpValue.length === 6;

  return (
    <div className="flex min-h-screen items-center justify-center bg-transparent px-4">
      <Card className="w-full max-w-[520px] rounded-2xl border border-black/10 bg-white shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle
            className="text-[28px] font-semibold tracking-[-0.02em]"
            style={{ color: "var(--ds-ink, #0b1220)" }}
          >
            Verify OTP
          </CardTitle>
          <CardDescription className="mx-auto max-w-sm text-sm leading-6 text-slate-600">
            Please enter the 6-digit code we have sent to your email
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="space-y-3 pt-4">
            {/* OTP boxes */}
            <div className="flex justify-center gap-3">
              {digits.map((val, i) => (
                <Input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={1}
                  value={val}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className={[
                    "h-12 w-12 rounded-xl bg-white text-center text-lg font-semibold text-slate-900 shadow-sm",
                    "border-[color:var(--ds-border,#e5e7eb)]",
                    "focus-visible:ring-2 focus-visible:ring-[color:var(--ds-ring,#0A79C9)]",
                    otpError ? "border-red-400 focus-visible:ring-red-200" : "",
                  ].join(" ")}
                />
              ))}
            </div>

            {/* Error */}
            {otpError && (
              <p className="text-center text-sm text-red-600">{otpError}</p>
            )}

            {/* Countdown / Resend */}
            <div className="text-center text-sm text-slate-600">
              {!showResend && (
                <Countdown
                  key={key}
                  date={Date.now() + 60000}
                  autoStart
                  onComplete={() => setShowResend(true)}
                  renderer={({ seconds }) => (
                    <span>You can request another code in: {seconds}s</span>
                  )}
                />
              )}

              {showResend && (
                <div className="mt-1 flex items-center justify-center gap-1">
                  <span>Didn’t receive the code?</span>
                  <button
                    type="button"
                    className="font-semibold text-[color:var(--ds-primary,#0A79C9)] hover:underline"
                  >
                    Resend Code
                  </button>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 pb-8">
            <Button
              type="submit"
              disabled={!isComplete || isSubmitting}
              className="h-12 w-full rounded-xl bg-[color:var(--ds-primary,#0A79C9)] text-white hover:bg-[color:var(--ds-primary-dark,#0868AE)] disabled:opacity-60"
            >
              {isSubmitting ? "Verifying..." : "Verify Code"}
            </Button>

            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-slate-600">Don’t have an account?</p>
              <Link
                href="/signup"
                className="text-sm font-semibold text-[color:var(--ds-primary,#0A79C9)] hover:underline"
              >
                Create yours
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
