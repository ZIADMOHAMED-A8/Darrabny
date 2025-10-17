"use client"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { resetPasswordAction } from "../services/auth"

export function CreatePasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    try {
      await resetPasswordAction(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* 🧱 Password Reset Card */}
      <Card className="w-full max-w-md bg-card rounded-2xl shadow-sm border-none">
        <CardHeader className="text-center pb-4 relative">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-2 text-muted-foreground hover:text-foreground"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          {/* Header */}
          <CardTitle className="text-3xl font-bold text-foreground">
            Create New Password
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Enter and confirm your new password below.
          </p>
        </CardHeader>

        <CardContent>
          {/* Password Form */}
          <form
            action={handleSubmit}
            className="space-y-5"
          >
            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="new-password" className="text-sm font-medium">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="new-password"
                  name="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 bg-muted/20 focus:bg-white pr-10 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  name="rePassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 bg-muted/20 focus:bg-white pr-10 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-medium rounded-xl transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-center text-sm text-muted-foreground">
          <p>Remembered your password?{" "}
            <a href="/login" className="text-primary font-medium hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
