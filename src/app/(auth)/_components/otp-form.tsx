"use client"

import { useState } from "react"
import Countdown from "react-countdown"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { resendCodeAction, verifyResetCodeAction } from "../services/auth"
import Link from "next/link"
export default function OtpPage() {
  const [key, setKey] = useState(0)
  const [showResend, setShowResend] = useState(false)

  const handleResend = async () => {
    await resendCodeAction()
    setShowResend(false)
    setKey((prev) => prev + 1) 
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md border-none relative">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-heading font-semibold">
            Verify OTP
          </CardTitle>
          <CardDescription>
            Please enter the 6-digit code we have sent to your email
          </CardDescription>
        </CardHeader>

        <form
          action={async (fd) => {
            await verifyResetCodeAction(fd)
          }}
        >
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex gap-2 justify-center">
                <Input
                  name="otp1"
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
                <Input
                  name="otp2"
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
                <Input
                  name="otp3"
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
                <Input
                  name="otp4"
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
                <Input
                  name="otp5"
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
                <Input
                  name="otp6"
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold"
                />
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="text-center text-sm text-gray-600">
              {!showResend && (
                <Countdown
                  key={key}
                  date={Date.now() + 60000}
                  autoStart={true}
                  onComplete={() => setShowResend(true)}
                  renderer={({ seconds }) => (
                    <span>You can request another code in: {seconds}s</span>
                  )}
                />
              )}

              {showResend && (
                <div className="mt-2 text-sm text-gray-600 flex items-center justify-center gap-1">
                  <span>Didn’t receive the code?</span>
                  <span
                    onClick={handleResend}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Resend Code
                  </span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Verify Code
            </Button>

            <div className="flex items-center gap-2 justify-center">
              <p className="text-base text-gray-500">Don’t have an account?</p>
              <Link href="/signup" className="text-blue-600 hover:underline">
                Create yours
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
