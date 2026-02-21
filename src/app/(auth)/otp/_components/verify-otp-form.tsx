"use client";

import * as React from "react";
import Countdown from "react-countdown";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import OtpInput from "./otp-input";
import {
  VerifyOtpSchema,
  VerifyOtpValues,
} from "@/lib/schemas/auth/verify-otp.schema";

type Props = {
  email?: string;
  editHref?: string;
  resendSeconds?: number;
};

export default function VerifyOtpForm({
  email = "user@example.com",
  editHref = "/login",
  resendSeconds = 60,
}: Props) {
  const [timerKey, setTimerKey] = React.useState(0);
  const [canResend, setCanResend] = React.useState(false);
  const [loadingResend, setLoadingResend] = React.useState(false);

  const form = useForm<VerifyOtpValues>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: { otp: "" },
    mode: "onSubmit",
  });

  async function onSubmit(values: VerifyOtpValues) {
    console.log("OTP Submitted:", values);
  }

  async function handleResend() {
    setLoadingResend(true);

    // محاكاة انتظار 1 ثانية بدل الأكشن الحقيقي
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setCanResend(false);
    setTimerKey((k) => k + 1);
    setLoadingResend(false);

    console.log("Resend clicked");
  }

  const otp = form.watch("otp");

  return (
    <Card className="w-full max-w-[520px] rounded-2xl border border-black/10 bg-white shadow-[0_25px_60px_-25px_rgba(15,23,42,.25)]">
      <CardContent className="p-10">
        <h1 className="text-center text-[40px] font-semibold leading-tight text-[var(--auth-title)]">
          Verify OTP
        </h1>

        <p className="mt-4 text-center text-sm text-[var(--auth-muted)]">
          Please enter the 6-digits code we have sent to:
        </p>

        <div className="mt-2 flex items-center justify-center gap-6">
          <span className="text-sm font-semibold text-slate-900">{email}</span>
          <Link
            href={editHref}
            className="text-sm font-semibold text-[var(--auth-primary)] hover:underline"
          >
            Edit
          </Link>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-7">
          <Controller
            control={form.control}
            name="otp"
            render={({ field }) => (
              <OtpInput
                value={field.value}
                onChange={(next) => field.onChange(next)}
              />
            )}
          />

          {form.formState.errors.otp?.message && (
            <p className="mt-3 text-center text-xs text-red-600">
              {form.formState.errors.otp.message}
            </p>
          )}

          {/* countdown / resend */}
          <div className="mt-6 text-center text-sm text-[var(--auth-muted)]">
            {!canResend ? (
              <Countdown
                key={timerKey}
                date={Date.now() + resendSeconds * 1000}
                autoStart
                onComplete={() => setCanResend(true)}
                renderer={({ seconds }) => (
                  <span>You can request another code in: {seconds}s</span>
                )}
              />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>Didn't receive the code?</span>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loadingResend}
                  className="font-semibold text-[var(--auth-primary)] hover:underline disabled:opacity-60"
                >
                  {loadingResend ? "Sending..." : "Resend"}
                </button>
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={otp.length !== 6 || form.formState.isSubmitting}
            className="mt-7 h-12 w-full rounded-xl bg-[var(--ds-primary)] text-white hover:bg-[var(--ds-primary-dark)] disabled:opacity-60"
          >
            Verify Code
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
