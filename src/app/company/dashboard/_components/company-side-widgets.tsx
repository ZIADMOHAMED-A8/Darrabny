// app/company/dashboard/_components/company-side-widgets.tsx
"use client";

import { CheckCircle2, ChevronRight, PieChart, Plus } from "lucide-react";

export default function CompanySideWidgets() {
  return (
    <aside className="w-full grid gap-7">
      {/* Keep same width */}
      <div className="w-full">
        <AcceptanceRateCard />
      </div>

      <div className="w-full">
        <VerificationCard />
      </div>

      <div className="w-full">
        <AcademicPartnersCard />
      </div>
    </aside>
  );
}

/* Widgets */

function AcceptanceRateCard() {
  return (
    <div className="w-full rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-start justify-between px-7 pt-7">
        <h3 className="text-lg font-extrabold">Acceptance Rate</h3>
        <PieChart className="h-5 w-5 text-[#0b1f33]/60" />
      </div>

      <div className="px-7 pt-4 pb-6">
        <div className="flex items-end gap-2">
          <div className="text-3xl font-extrabold">75%</div>
          <div className="pb-1 text-sm font-semibold text-[#0b1f33]/55">
            Avg.
          </div>
        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-black/20 overflow-hidden">
          <div className="h-full w-[75%] rounded-full bg-[#1f7ed6]" />
        </div>
      </div>
    </div>
  );
}

function VerificationCard() {
  return (
    <div className="w-full rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="px-7 pt-7">
        <h3 className="text-lg font-extrabold">Verification Status</h3>
      </div>

      <div className="px-7 pt-5 pb-6">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-black/10">
            <CheckCircle2 className="h-6 w-6 text-[#0b1f33]/80" />
          </div>

          <div className="min-w-0">
            <div className="text-base font-extrabold">University Verified</div>
            <p className="mt-1 text-sm leading-5 text-[#0b1f33]/60">
              Your company is fully verified to host interns from partner
              institutions.
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#2f7d32]">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#2f7d32]" />
              Valid until Dec 2024
            </div>
          </div>
        </div>

        <button className="mt-5 w-full rounded-md bg-[#1f7ed6] py-2.5 text-sm font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[#1b72c2]">
          Manage Credentials
        </button>
      </div>
    </div>
  );
}

function AcademicPartnersCard() {
  return (
    <div className="w-full rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
      <div className="flex items-center justify-between px-7 pt-7">
        <h3 className="text-lg font-extrabold">Academic Partners</h3>
        <button
          className="text-[#0b1f33]/60 hover:text-[#0b1f33]"
          aria-label="Add"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="px-6 pt-5 pb-6">
        <PartnerTech />
        <PartnerState />
        <PartnerCentral />

        <div className="mt-5 border-t border-black/10 pt-4 text-center">
          <button className="text-sm font-bold text-[#1f7ed6] hover:text-[#1b72c2]">
            View All Partnerships
          </button>
        </div>
      </div>
    </div>
  );
}

/* Partners */

function PartnerTech() {
  return <PartnerRow name="Tech University" subtitle="Premium Partner" />;
}
function PartnerState() {
  return <PartnerRow name="State College" subtitle="Active Agreement" />;
}
function PartnerCentral() {
  return <PartnerRow name="Central Uni" subtitle="Active Agreement" />;
}

function PartnerRow({ name, subtitle }: { name: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-black/5">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-lg bg-black/10 text-xs font-extrabold text-[#0b1f33]/70 shadow-sm">
          TU
        </div>

        <div>
          <div className="text-sm font-extrabold">{name}</div>
          <div className="text-xs text-[#0b1f33]/50">{subtitle}</div>
        </div>
      </div>

      <ChevronRight className="h-5 w-5 text-[#0b1f33]/50" />
    </div>
  );
}
