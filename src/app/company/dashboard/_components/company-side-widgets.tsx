"use client";

import { CheckCircle2, PieChart } from "lucide-react";
import type {
  CompanyVerification,
  AcademicPartner,
} from "../actions/get-company-dashboard.action";
import { useRouter } from "next/navigation";

interface CompanySideWidgetsProps {
  acceptanceRate: number;
  verification: CompanyVerification;
  academicPartners: AcademicPartner[];
}

export default function CompanySideWidgets({
  acceptanceRate,
  verification,
  academicPartners,
}: CompanySideWidgetsProps) {
  return (
    <aside className="grid w-full gap-4 lg:gap-6">
      <AcceptanceRateCard acceptanceRate={acceptanceRate} />
      <VerificationCard status={verification.status} validUntil={verification.validUntil} />
      <AcademicPartnersCard partners={academicPartners} />
    </aside>
  );
}

interface AcceptanceRateCardProps {
  acceptanceRate: number;
}

function AcceptanceRateCard({ acceptanceRate }: AcceptanceRateCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Acceptance Rate</h3>
        <PieChart className="h-5 w-5 text-blue-600" />
      </div>

      <div className="flex items-end gap-2 mb-4">
        <div className="text-3xl font-bold text-gray-900">
          {acceptanceRate}%
        </div>
        <div className="text-sm text-gray-500">Avg.</div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{ width: `${acceptanceRate}%` }}
        />
      </div>
    </div>
  );
}

interface VerificationCardProps {
  status: "pending" | "verified" | "rejected";
  validUntil: string | null;
}

function VerificationCard({ status, validUntil }: VerificationCardProps) {
  const router = useRouter();

  const isVerified = status === "verified";
  const statusText = isVerified ? "University Verified" : "Verification Pending";
  const statusDesc = isVerified
    ? "Your company is fully verified to host interns from partner institutions."
    : "Your company verification is pending. Complete your credentials to get verified.";
  const statusColor = isVerified ? "text-green-600" : "text-amber-600";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Verification Status
      </h3>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-shrink-0">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <CheckCircle2 className={`h-6 w-6 ${statusColor}`} />
          </div>
        </div>

        <div className="flex-1">
          <div className="font-semibold text-gray-900">{statusText}</div>
          <p className="mt-1 text-sm text-gray-600">{statusDesc}</p>

          {isVerified && validUntil && (
            <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-600">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-600" />
              Valid until {validUntil}
            </div>
          )}
        </div>
      </div>

      <button onClick={()=>{
        router.push('/company/verification')
      }} className="mt-5 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
        Manage Credentials
      </button>
    </div>
  );
}

interface AcademicPartnersCardProps {
  partners: AcademicPartner[];
}

function AcademicPartnersCard({ partners }: AcademicPartnersCardProps) {
  const router = useRouter();

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Academic Partners
        </h3>

      </div>

      <div className="space-y-2">
        {partners.map((partner, idx) => (
          <PartnerRow
            key={idx}
            universityName={partner.universityName}
            agreementStatus={partner.agreementStatus}
          />
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-200 text-center">
        <button
          onClick={() => router.push("/company/partners")}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All Partnerships
        </button>
      </div>
    </div>
  );
}

interface PartnerRowProps {
  universityName: string;
  agreementStatus: string;
}

function PartnerRow({ universityName, agreementStatus }: PartnerRowProps) {
  const initials = universityName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between rounded-lg px-2 py-3 transition-colors hover:bg-gray-50 sm:px-3">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-12 items-center justify-center rounded-lg bg-gray-200 text-xs font-bold text-gray-700">
          {initials}
        </div>

        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-gray-900">{universityName}</div>
          <div className="text-xs text-gray-500">{agreementStatus}</div>
        </div>
      </div>
    </div>
  );
}
