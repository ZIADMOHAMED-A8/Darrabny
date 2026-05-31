"use client";

import { useState } from "react";
import InternshipPostForm from "@/app/company/internships/_components/internship-post-form";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen  bg-[#F3F4F6] flex-col px-4 sm:px-6 lg:px-16">

        {/* الزرار فوق يمين */}
        <div className="flex justify-stretch pt-6 sm:justify-end">
          <button
            onClick={() => setOpen(true)}
            className="w-full rounded-2xl bg-[#1786E5] px-3 py-3 text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(23,134,229,0.25)] transition hover:bg-[#0f78d3] sm:w-auto"
          >
            + New Posting
          </button>
        </div>

        {/* الهيدر */}
        <div className="flex justify-center">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tight text-[#0A1633] sm:text-4xl md:text-6xl">
            Training <span className="text-[#2F8FF7]">provided</span> by the
            company
          </h1>
        </div>

        {/* المحتوى */}
        <main className="mt-8 flex-1 p-0 text-black">
          {children}
        </main>

        {/* المودال زي ما هو */}
        {open && (
          <div className="fixed  inset-0 z-50 flex items-center justify-center px-4">
            <div
              className="absolute inset-0 bg-[#091426]/45 backdrop-blur-[3px]"
              onClick={() => setOpen(false)}
            />

            <div
              className="
    relative
    z-50
    max-h-[92vh]
    w-[920px]
    max-w-[95vw]
    overflow-y-auto
    rounded-[20px]
    shadow-2xl
    sm:rounded-[28px]
    [scrollbar-width:none]
    [-ms-overflow-style:none]
    [&::-webkit-scrollbar]:hidden
  "
            >
              <InternshipPostForm onCancel={() => setOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
