"use client";

import { useState } from "react";
import InternshipPostForm from "./internship-post-form";

export default function CompanyInternshipsHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1" />

        <div className="flex justify-center">
          <h1 className="text-center text-3xl leading-tight md:text-6xl font-bold tracking-[-0.03em] text-[#0A1633]">
            Training <span className="text-[#2F8FF7]">provided</span> by the companies
          </h1>
        </div>

        <div className="flex-1 flex justify-end items-center">
          <button
            onClick={() => setOpen(true)}
            className="rounded-2xl bg-[#1786E5] px-3 py-3 text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(23,134,229,0.25)] transition hover:bg-[#0f78d3]"
          >
            + New Posting
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#091426]/45 backdrop-blur-[3px]"
            onClick={() => setOpen(false)}
          />

          <div className="relative z-50 w-[920px] max-w-[95vw] max-h-[92vh] overflow-y-auto rounded-[28px] shadow-2xl">
            <InternshipPostForm onCancel={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}