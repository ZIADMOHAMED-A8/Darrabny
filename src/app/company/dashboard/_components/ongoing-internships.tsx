"use client";

import { Users } from "lucide-react";

export default function OngoingInternships() {
  return (
    <div className="rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden">
      <div className="px-8 pt-7 pb-4">
        <h2 className="text-lg font-extrabold">Ongoing Internships</h2>
      </div>

      <div className="px-8 pb-2">
        <div className="grid grid-cols-[1.4fr_1.4fr_1.1fr_1fr_0.7fr] text-sm font-bold text-[#0b1f33]/70">
          <div>Title</div>
          <div>Role</div>
          <div>University</div>
          <div>Status</div>
          <div className="text-right">Student</div>
        </div>
      </div>

      <div className="px-6 pb-4">
        <RowJD />
        <RowAS />
        <RowMK />
      </div>

      <div className="px-8 pb-6 pt-2 text-center text-sm text-[#0b1f33]/45">
        Showing 3 of 12 active interns
      </div>
    </div>
  );
}

/* Rows */

function RowJD() {
  return (
    <div className="mt-3 rounded-xl px-2 py-3">
      <div className="grid grid-cols-[1.4fr_1.4fr_1.1fr_1fr_0.7fr] items-center">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f2f2f2] text-sm font-extrabold text-[#e7728c] shadow-sm">
            JD
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">Jane Doe</div>
            <div className="text-xs text-[#0b1f33]/50">Jane@Darrabny.com</div>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold">Frontend Dev</div>
          <div className="text-xs text-[#0b1f33]/50">Summer Internship</div>
        </div>

        <div className="text-sm text-[#0b1f33]/70">Tech University</div>

        <div>
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold bg-[#74d18b] text-[#0b1f33]">
            Active
          </span>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="text-sm font-bold text-[#1f7ed6]">45</div>
          <Users className="h-5 w-5 text-[#0b1f33]/60" />
        </div>
      </div>
    </div>
  );
}

function RowAS() {
  return (
    <div className="mt-3 rounded-xl px-2 py-3">
      <div className="grid grid-cols-[1.4fr_1.4fr_1.1fr_1fr_0.7fr] items-center">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f2f2f2] text-sm font-extrabold text-[#7b7df1] shadow-sm">
            AS
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">Alex Smith</div>
            <div className="text-xs text-[#0b1f33]/50">alex@Darrabny.com</div>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold">Product Design</div>
          <div className="text-xs text-[#0b1f33]/50">Fall Co-op</div>
        </div>

        <div className="text-sm text-[#0b1f33]/70">State College</div>

        <div>
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold bg-[#d8dd6f] text-[#0b1f33]">
            Onboarding
          </span>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="text-sm font-bold text-[#1f7ed6]">50</div>
          <Users className="h-5 w-5 text-[#0b1f33]/60" />
        </div>
      </div>
    </div>
  );
}

function RowMK() {
  return (
    <div className="mt-3 rounded-xl px-2 py-3">
      <div className="grid grid-cols-[1.4fr_1.4fr_1.1fr_1fr_0.7fr] items-center">
        <div className="flex items-center gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-full bg-[#f2f2f2] text-sm font-extrabold text-[#7b7df1] shadow-sm">
            MK
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold">Maria Kline</div>
            <div className="text-xs text-[#0b1f33]/50">maria@Darrabny.com</div>
          </div>
        </div>

        <div className="text-sm">
          <div className="font-semibold">Data Analyst</div>
          <div className="text-xs text-[#0b1f33]/50">6-Month Contract</div>
        </div>

        <div className="text-sm text-[#0b1f33]/70">Central Uni</div>

        <div>
          <span className="inline-flex rounded-full px-3 py-1 text-xs font-bold bg-[#74d18b] text-[#0b1f33]">
            Active
          </span>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="text-sm font-bold text-[#1f7ed6]">120</div>
          <Users className="h-5 w-5 text-[#0b1f33]/60" />
        </div>
      </div>
    </div>
  );
}
