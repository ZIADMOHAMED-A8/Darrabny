"use client";

import * as React from "react";

type Props = {
  value: string; // "123456"
  onChange: (next: string) => void;
  disabled?: boolean;
};

export default function OtpInput({ value, onChange, disabled }: Props) {
  const refs = React.useRef<Array<HTMLInputElement | null>>([]);

  const digits = React.useMemo(() => {
    const v = (value ?? "").slice(0, 6);
    return Array.from({ length: 6 }).map((_, i) => v[i] ?? "");
  }, [value]);

  function setAt(index: number, char: string) {
    const next = digits.slice();
    next[index] = char;
    onChange(next.join("").slice(0, 6));
  }

  function focus(i: number) {
    refs.current[i]?.focus();
    refs.current[i]?.select();
  }

  function handleChange(i: number, raw: string) {
    if (disabled) return;

    // لو Paste رقم كامل في خانة واحدة
    const clean = raw.replace(/\D/g, "");
    if (!clean) {
      setAt(i, "");
      return;
    }

    if (clean.length === 1) {
      setAt(i, clean);
      if (i < 5) focus(i + 1);
      return;
    }

    // paste multi digits
    const merged = (digits.join("") + "").split("");
    let idx = i;
    for (const ch of clean) {
      if (idx > 5) break;
      merged[idx] = ch;
      idx++;
    }
    onChange(merged.join("").slice(0, 6));
    focus(Math.min(idx, 5));
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[i]) {
        setAt(i, "");
      } else if (i > 0) {
        setAt(i - 1, "");
        focus(i - 1);
      }
    }

    if (e.key === "ArrowLeft" && i > 0) {
      e.preventDefault();
      focus(i - 1);
    }

    if (e.key === "ArrowRight" && i < 5) {
      e.preventDefault();
      focus(i + 1);
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    if (disabled) return;

    const text = e.clipboardData.getData("text");
    const clean = text.replace(/\D/g, "").slice(0, 6);
    if (!clean) return;

    e.preventDefault();
    onChange(clean);
    focus(Math.min(clean.length, 6) - 1);
  }

  return (
    <div className="flex justify-center gap-3">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          inputMode="numeric"
          autoComplete="one-time-code"
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={[
            "h-12 w-12 rounded-lg border border-slate-200 bg-white text-center text-base font-semibold text-slate-900",
            "shadow-sm outline-none",
            "focus:ring-4 focus:ring-[var(--auth-primary)]/15 focus:border-[var(--auth-primary)]",
            "disabled:opacity-60 disabled:cursor-not-allowed",
          ].join(" ")}
          maxLength={6}
        />
      ))}
    </div>
  );
}