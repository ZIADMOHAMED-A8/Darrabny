"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/lib/api/forgot-password-flow/forgot-password.api";


// Props
type ResendCodeProps = {
  payload: {
    email: string;
  };
};

export default function ResendCode({ payload }: ResendCodeProps) {
  const { email } = payload;

  const [time, setTime] = useState(0);

  const handleClick = async () => {
    setTime(60);
    await forgotPassword({ email });

    const countdown = setInterval(() => {
      setTime((t) => {
        if (t <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const isDisabled = time > 0;

  return (
    <div className="w-full flex justify-end mt-4">
      <Button
        variant="ghost"
        onClick={handleClick}
        disabled={isDisabled}
        className={`font-primary font-medium text-base text-[#27272A]
          bg-transparent shadow-none hover:bg-transparent hover:text-[#27272A]
          focus-visible:ring-0 focus-visible:outline-none active:outline-none
          transition-opacity duration-200 ease-in-out
          ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Send a new code
      </Button>
    </div>
  );
}
