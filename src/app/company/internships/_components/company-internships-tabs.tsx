"use client";

import { CompanyInternshipStatus } from "../_data/internships";

type Props = {
  tab: CompanyInternshipStatus;
  onChange: (tab: CompanyInternshipStatus) => void;
};

export default function CompanyInternshipsTabs({ tab, onChange }: Props) {
  return (
    <div className="mt-8 flex justify-center">
      <div className="flex items-center gap-10 border-b border-[#C9D4E5] pb-1 text-[18px]">
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
        "relative pb-3 font-medium transition-colors",
        active
          ? "text-[#2F8FF7]"
          : "text-[#6B7280] hover:text-[#0A1633]",
      ].join(" ")}
    >
      {label}
      {active && (
        <span className="absolute left-0 right-0 bottom-[-2px] h-[3px] rounded-full bg-[#2F8FF7]" />
      )}
    </button>
  );
}