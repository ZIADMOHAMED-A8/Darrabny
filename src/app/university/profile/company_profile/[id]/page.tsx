"use client";

import { useParams } from "next/navigation";
import { useCompany } from "./hooks/use-company";

function Icon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  globe: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  building: "M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10v4M12 10v4M16 10v4",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z",
  calendar: "M3 4h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 2v4M16 2v4M2 10h20",
  thumb_up: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3",
  thumb_down: "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17",
  arrow_right: "M5 12h14M12 5l7 7-7 7",
  clock: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
};

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#F59E0B" : "none"}
          stroke={i < Math.round(rating) ? "#F59E0B" : "#CBD5E1"}
          strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

const MOCK_DISTRIBUTION = [
  { star: 5, pct: 40 },
  { star: 4, pct: 30 },
  { star: 3, pct: 15 },
  { star: 2, pct: 10 },
  { star: 1, pct: 5 },
];

function RatingBars() {
  return (
    <div className="flex flex-col gap-1.5 flex-1">
      {MOCK_DISTRIBUTION.map(({ star, pct }) => (
        <div key={star} className="flex items-center gap-2 text-xs text-slate-500">
          <span className="w-2 text-right shrink-0">{star}</span>
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1A6FA8] rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-7 shrink-0 text-right">{pct}%</span>
        </div>
      ))}
    </div>
  );
}

function SocialDot({ label }: { label: string }) {
  const colors: Record<string, string> = {
    Facebook: "#1877F2",
    LinkedIn: "#0A66C2",
    X: "#000000",
    Instagram: "#E1306C",
    WhatsApp: "#25D366",
  };
  return (
    <div
      title={label}
      style={{ background: colors[label] || "#888" }}
      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition"
    >
      {label[0]}
    </div>
  );
}

function DetailRow({ label, value, isLink }: { label: string; value?: string; isLink?: boolean }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">{label}</p>
      {isLink
        ? <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-xs text-[#1A6FA8] hover:underline break-all">{value}</a>
        : <p className="text-xs text-slate-700 font-medium">{value}</p>
      }
    </div>
  );
}

export default function CompanyProfilePage() {
  const params = useParams();
  const companyId = params.id as string;
  const { data, isLoading } = useCompany(companyId);

  const company = data?.company;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-400">
        Loading company profile…
      </div>
    );
  }

  const employeeRange = company?.numberOfEmployees
    ? `${company.numberOfEmployees.from || 0}–${company.numberOfEmployees.to || 0} employees`
    : null;

  return (
    <main className="min-h-screen w-full bg-[#EEF2FB] py-6 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-4">

        {/* HERO CARD */}
        <div className="bg-white rounded-2xl px-6 py-5 shadow-sm border border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-slate-300 to-slate-200" />
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-tight">
                {company?.companyName || "Company Name"}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {company?.description?.split(".")[0] || "Company tagline goes here"}
              </p>
              <div className="flex flex-wrap gap-4 mt-2.5 text-xs text-slate-500">
                {company?.address && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400"><Icon d={ICONS.pin} /></span>
                    {company.address}
                  </span>
                )}
                {employeeRange && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400"><Icon d={ICONS.users} /></span>
                    {employeeRange}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-col lg:flex-row gap-4 items-start">

          {/* LEFT column */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-800 mb-3">About Us</h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {company?.description || "No company description provided yet."}
              </p>

              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">Industry Sectors</p>
                <div className="flex flex-wrap gap-2">
                  {(company?.industry
                    ? company.industry.split(",").map((s: string) => s.trim())
                    : ["General"]
                  ).map((tag: string) => (
                    <span key={tag} className="bg-[#1A6FA8] text-white text-[11px] font-medium px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Internships */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-800">Active Internships</h2>
              </div>

              <div className="space-y-3">
                {data?.internships?.map((intern: any) => (
                  <div key={intern.id} className="border border-slate-100 rounded-xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 shrink-0" />
                        <div>
                          <p className="text-xs font-bold text-slate-800">
                            {intern.internshipTitle}
                          </p>
                          <div className="flex gap-3 mt-1 text-[11px] text-slate-500">
                            <span>{intern.internshipLocation}</span>
                            <span>{intern.workingTime}</span>
                            <span>{intern.postedAgo}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {intern.technicalSkills?.map((s: string, i: number) => (
                              <span
                                key={i}
                                className="border border-slate-200 text-[10px] text-slate-600 px-2 py-0.5 rounded-full"
                              >
                                {s.replace(/[\[\]\"]/g, "")}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Intern Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-800 mb-5">Intern Reviews</h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="shrink-0">
                  <p className="text-4xl font-bold text-slate-900">{company?.rating?.toFixed(1) || "4.5"}</p>
                  <Stars rating={company?.rating || 4.5} />
                  <p className="text-[11px] text-slate-400 mt-1">Based on {company?.totalReviews || 125} reviews</p>
                </div>

              </div>

              <div className="space-y-4">
                {data?.reviews?.map((r: any) => (
                  <div key={r.id} className="border border-slate-100 rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-slate-200 text-slate-700">
                          {r.user?.fullName
                            ?.split(" ")
                            ?.map((n: string) => n[0])
                            ?.join("")
                            ?.slice(0, 2)}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800">{r.user?.fullName}</p>
                          <p className="text-[11px] text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Stars rating={r.rating} size={14} />
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-3">{r.comment}</p>
                    <div className="flex gap-4 text-[11px] text-slate-500">
                      <button className="flex items-center gap-1.5 hover:text-slate-700 transition">
                        <Icon d={ICONS.thumb_up} size={13} /> 0
                      </button>
                      <button className="flex items-center gap-1.5 hover:text-slate-700 transition">
                        <Icon d={ICONS.thumb_down} size={13} /> 0
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="w-full lg:w-64 shrink-0 bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-5">
            <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Company Details</h2>

            <DetailRow label="Website" value={company?.website || "technova-solutions.com"} isLink />
            <DetailRow label="Headquarters" value={company?.address || "100 Innovation Dr, San Francisco, CA 94103"} />
            <DetailRow label="Phone" value={company?.companyPhone} />
            <DetailRow label="Size" value={employeeRange || "500–1000 Employees"} />
            <DetailRow label="Founded" value={company?.foundedYear?.toString() || "2015"} />

            {company?.verificationStatus && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">Verification</p>
                <span className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${company.verificationStatus === "verified"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}>
                  {company.verificationStatus}
                </span>
              </div>
            )}

            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">Social Profiles</p>
              <div className="flex gap-2 flex-wrap">
                {["Facebook", "LinkedIn", "X", "Instagram", "WhatsApp"].map(s => (
                  <SocialDot key={s} label={s} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
