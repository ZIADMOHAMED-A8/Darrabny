"use client";
import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFormField } from "./form";

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;
  const { error } = useFormField();

  return (
    <div className="relative">
      <input
        type={inputType}
        ref={ref}
        {...props}
        className={cn(
          // === Layout & Sizing ===
          "flex h-[3.0625rem] w-full rounded-[0.625rem] p-4",

          // === Borders & Background ===
          "border border-zinc-300 dark:border-zinc-600",
          "bg-white dark:bg-zinc-700",

          // === Text & Placeholder ===
          "text-base md:text-sm placeholder:text-zinc-400",

          // === Hover States ===
          "hover:border-zinc-400 dark:hover:border-zinc-500",

          // === Focus States ===
          "focus-visible:outline-none focus-visible:ring-0",
          "focus-visible:border-maroon-600 dark:focus-visible:border-softPink-400",

          // === File Input Compatibility ===
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",

          // === Disabled State ===
          "disabled:cursor-not-allowed disabled:opacity-50",

          // === Transitions ===
          "transition-colors duration-200 ease-in-out",

          // === Ring Offset ===
          "ring-offset-background",

          // === Add padding if password type ===
          type === "password" && "pr-10",

          // === Custom class from props ===
          className,

          // === Error State ===
          error && "border-red-600 dark:border-red-500",
        )}
      />

      {/* === Toggle Password Visibility Button === */}
      {type === "password" && (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-500 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";
export { PasswordInput };
