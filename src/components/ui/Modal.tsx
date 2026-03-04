"use client";

import { ReactNode } from "react";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 !m-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0  bg-black/50 backdrop-blur-sm"
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md bg-[#041f36] rounded-2xl p-6 border border-white/10">
        {children}
      </div>
    </div>
  );
}
