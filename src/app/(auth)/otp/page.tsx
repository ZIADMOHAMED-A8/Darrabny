// src/app/(auth)/verify-otp/page.tsx
import VerifyOtpForm from "./_components/verify-otp-form";

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <VerifyOtpForm email="user@example.com" editHref="/login" />
    </div>
  );
}
