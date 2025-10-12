"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { resetPasswordAction } from "../services/auth"

export function CreatePasswordForm() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button variant="ghost" size="sm" className="p-2 h-auto" onClick={() => window.history.back()}>
        <ArrowLeft className="h-4 w-4" />
      </Button>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-foreground">Create a New Password</h1>
        <p className="text-sm text-muted-foreground">Create a new strong password for your account.</p>
      </div>

      {/* Form */}
      <form action={async (fd) => {
               console.log("form-data",fd);
               await resetPasswordAction(fd);
             }}>
        {/* New Password Field */}
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
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm New Password
          </Label>
          <div className="relative">
            <Input
              id="confirm-password"
              name="rePassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="pr-10"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
          Update Password
        </Button>
      </form>
    </div>
  )
}
