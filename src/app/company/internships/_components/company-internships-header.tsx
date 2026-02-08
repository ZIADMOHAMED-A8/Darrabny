"use client";

export default function CompanyInternshipsHeader() {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1" />

      <h1 className="mx-auto inline-flex rounded-2xl bg-white/10 px-8 py-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white shadow-sm">
        Training provided by the companys
      </h1>

      <div className="flex-1 flex justify-end">
        <button className="rounded-xl bg-[#1f7ed6] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:bg-[#1b72c2]">
          + New Posting
        </button>
      </div>
    </div>
  );
}
