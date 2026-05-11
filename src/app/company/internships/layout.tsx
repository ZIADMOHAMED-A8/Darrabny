"use client";

import { useState } from "react";
import InternshipPostForm from "@/app/company/internships/_components/internship-post-form";
import StudentTopBar from "@/app/_components/StudentTopBar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
    <StudentTopBar></StudentTopBar>
    <div className="min-h-screen flex flex-col px-16">

      {/* الزرار فوق يمين */}
      <div className="flex justify-end pt-6">
        <button
          onClick={() => setOpen(true)}
          className="rounded-2xl bg-[#1786E5] px-3 py-3 text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(23,134,229,0.25)] transition hover:bg-[#0f78d3]"
        >
          + New Posting
        </button>
      </div>

      {/* الهيدر */}
      <div className="flex justify-center">
        <h1 className="text-center text-3xl leading-tight md:text-6xl font-bold tracking-[-0.03em] text-[#0A1633]">
          Training <span className="text-[#2F8FF7]">provided</span> by the
          company
        </h1>
      </div>

      {/* المحتوى */}
      <main className="flex-1 mt-8 p-0 text-black">
        {children}
      </main>

      {/* المودال زي ما هو */}
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
    </div>
    </>
  );
}