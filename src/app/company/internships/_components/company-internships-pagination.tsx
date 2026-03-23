"use client";

export default function CompanyInternshipsPagination() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex items-center gap-3 border-b border-[#AEB9C8] pb-3 text-[16px] text-[#0A1633]">
        <button className="rounded-md px-2 py-1 font-medium text-[#0A1633] transition hover:text-[#1786E5]">
          ‹ Previous
        </button>

        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#091A37] font-semibold text-white">
            1
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A1633] transition hover:bg-[#E9EEF7]">
            2
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A1633] transition hover:bg-[#E9EEF7]">
            3
          </button>
          <span className="px-1 text-[#0A1633]">...</span>
          <button className="flex h-10 w-10 items-center justify-center rounded-xl text-[#0A1633] transition hover:bg-[#E9EEF7]">
            10
          </button>
        </div>

        <button className="rounded-md px-2 py-1 font-medium text-[#0A1633] transition hover:text-[#1786E5]">
          Next ›
        </button>
      </div>
    </div>
  );
}