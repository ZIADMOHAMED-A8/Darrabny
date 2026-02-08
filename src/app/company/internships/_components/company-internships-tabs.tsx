"use client";

import { CompanyInternshipStatus } from "../_data/internships";

type Props = {
  tab: CompanyInternshipStatus;
  onChange: (tab: CompanyInternshipStatus) => void;
};

export default function CompanyInternshipsTabs({ tab, onChange }: Props) {
  return (
    <div className="mt-6 flex justify-center">
      <div className="flex items-center gap-10 text-sm text-white/80">
        <Tab
          label="All"
          active={tab === "all"}
          onClick={() => onChange("all")}
        />
        <Tab
          label="Active"
          active={tab === "active"}
          onClick={() => onChange("active")}
        />
        <Tab
          label="Closed"
          active={tab === "closed"}
          onClick={() => onChange("closed")}
        />
        <Tab
          label="Starting soon"
          active={tab === "starting"}
          onClick={() => onChange("starting")}
        />
      </div>
    </div>
  );
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "relative pb-2 transition-colors",
        active ? "text-[#1f7ed6] font-bold" : "text-white/80 hover:text-white",
      ].join(" ")}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1f7ed6] rounded-full" />
      )}
    </button>
  );
}
