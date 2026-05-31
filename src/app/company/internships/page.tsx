
import { EmploymentType, InternshipMode } from "@/lib/types/internships/internships";
import CompanyInternshipsGrid from "./_components/company-internships-grid";


export default function CompanyInternshipsPage() {

  return (
    <main className="relative  bg-[#F3F4F6] min-h-screen text-white">
      <div className="relative z-1">
        <CompanyInternshipsGrid />

      </div>
    </main>
  );
}

function normalizeMode(value?: string): InternshipMode {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("hybrid")) return "Hybrid";
  if (
    normalized.includes("on-site") ||
    normalized.includes("onsite") ||
    normalized.includes("on site")
  ) {
    return "On-site";
  }
  if (normalized.includes("remote")) return "Remote";
  return "Remote";
}

function normalizeEmploymentType(value?: string): EmploymentType {
  const normalized = (value ?? "").toLowerCase();
  if (normalized.includes("part")) return "Part-time";
  if (normalized.includes("contract")) return "Contract";
  if (normalized.includes("intern")) return "Internship";
  return "Full-time";
}
