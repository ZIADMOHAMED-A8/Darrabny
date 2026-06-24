"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useCompanyProfile } from "./hooks/use-company-profile";
import { useUpdateCompanyProfile } from "./hooks/use-update-company-profile";
import { useUploadCompanyLogo } from "./hooks/use-upload-company-logo";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

/* ─── Icon helpers ─────────────────────────────────────────────────────────── */
function Icon({ d, size = 14 }: { d: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const ICONS = {
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM12 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  users:
    "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  globe:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z",
  building:
    "M3 21h18M3 7l9-4 9 4M4 7v14M20 7v14M8 10v4M12 10v4M16 10v4",
  phone:
    "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.16 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 17z",
  calendar:
    "M3 4h18a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM8 2v4M16 2v4M2 10h20",
  check: "M20 6L9 17l-5-5",
  x: "M18 6L6 18M6 6l12 12",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  camera:
    "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  thumb_up:
    "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3",
  thumb_down:
    "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10zM17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17",
  arrow_right: "M5 12h14M12 5l7 7-7 7",
  clock:
    "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2",
  refresh:
    "M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
};

/* ─── extractLogoUrl ────────────────────────────────────────────────────────── */
function extractLogoUrl(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const root = payload as Record<string, unknown>;
  const candidates = [
    root.logo,
    root.companyLogo,
    root.profilePic,
    (root.company as Record<string, unknown> | undefined)?.logo,
    (root.company as Record<string, unknown> | undefined)?.companyLogo,
    (root.data as Record<string, unknown> | undefined)?.logo,
    (root.data as Record<string, unknown> | undefined)?.companyLogo,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate;
    }
    if (candidate && typeof candidate === "object") {
      const secureUrl = (candidate as Record<string, unknown>).secure_url;
      const url = (candidate as Record<string, unknown>).url;
      if (typeof secureUrl === "string" && secureUrl.trim()) return secureUrl;
      if (typeof url === "string" && url.trim()) return url;
    }
  }

  return null;
}

/* ─── Star rating ───────────────────────────────────────────────────────────── */
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={i < Math.round(rating) ? "#F59E0B" : "none"}
          stroke={i < Math.round(rating) ? "#F59E0B" : "#CBD5E1"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

/* ─── Rating bar chart ──────────────────────────────────────────────────────── */
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
        <div
          key={star}
          className="flex items-center gap-2 text-xs text-slate-500"
        >
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

/* ─── Social icon ───────────────────────────────────────────────────────────── */
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

/* ─── Field row in sidebar ──────────────────────────────────────────────────── */
function DetailRow({
  label,
  value,
  isLink,
}: {
  label: string;
  value?: string;
  isLink?: boolean;
}) {
  if (!value) return null;
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">
        {label}
      </p>
      {isLink ? (
        <a
          href={`https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#1A6FA8] hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-xs text-slate-700 font-medium">{value}</p>
      )}
    </div>
  );
}

/* ─── Input field ───────────────────────────────────────────────────────────── */
function Field({
  label,
  value,
  onChange,
  span2 = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition"
      />
    </div>
  );
}

/* ─── Error state ───────────────────────────────────────────────────────────── */
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-sm">
        <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-500">
          <Icon d={ICONS.x} size={20} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 mb-1">
            Something went wrong
          </p>
          <p className="text-xs text-slate-500">{message}</p>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1A6FA8] hover:underline"
          >
            <Icon d={ICONS.refresh} size={12} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

/* ─── Types ─────────────────────────────────────────────────────────────────── */
type CompanyInternshipSummary = {
  id: string;
  internshipTitle?: string;
  internshipLocation?: string;
  workingTime?: string;
  postedAgo?: string;
  technicalSkills?: string[];
};

type CompanyReviewSummary = {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
  user?: {
    fullName?: string;
  };
};

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function CompanyProfilePage() {
  /* ── Hooks ────────────────────────────────────────────────────────────────── */
  const {
    data,
    isLoading,
    isError: isProfileError,
    error: profileError,
    refetch,
  } = useCompanyProfile();

  const {
    mutate: updateProfile,
    isPending,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdateError,
  } = useUpdateCompanyProfile();

  const { mutateAsync: uploadLogo, isPending: isUploadingLogo } =
    useUploadCompanyLogo();

  const { toast } = useToast();
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  /* ── Local state ──────────────────────────────────────────────────────────── */
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    industry: "",
    address: "",
    companyPhone: "",
  });

  /* ── Sync form when data loads ────────────────────────────────────────────── */
  useEffect(() => {
    const company = data?.company;
    if (!company) return;
    setFormData({
      companyName: company.companyName || "",
      description: company.description || "",
      industry: company.industry || "",
      address: company.address || "",
      companyPhone: company.companyPhone || "",
    });
  }, [data?.company]);

  /* ── Derived values (safe to compute before early returns) ────────────────── */
  const company = data?.company;
  const companyId = company?._id || company?.id;
  const logoUrl = logoPreview || extractLogoUrl(company);
  const employeeRange = company?.numberOfEmployees
    ? `${company.numberOfEmployees.from || 0}–${company.numberOfEmployees.to || 0} employees`
    : null;

  /* ── Handlers ─────────────────────────────────────────────────────────────── */
  function handleOpenEdit() {
    resetUpdateError();
    setIsEditing(true);
  }

  function handleCloseEdit() {
    setIsEditing(false);
  }

  function handleSave() {
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
        toast({
          title: "Profile updated",
          description: "Your company profile was saved successfully.",
        });
      },
      onError: (err) => {
        toast({
          title: "Update failed",
          description:
            err instanceof Error
              ? err.message
              : "Could not save profile changes.",
          variant: "destructive",
        });
      },
    });
  }

  async function handleLogoChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.currentTarget.value = "";

    if (!file || !companyId) return;

    try {
      const fd = new FormData();
      fd.append("attachment", file);

      const result = await uploadLogo({ companyId, formData: fd });
      setLogoPreview(extractLogoUrl(result) || URL.createObjectURL(file));

      toast({
        title: "Logo updated",
        description: "Your company logo was uploaded successfully.",
      });
    } catch (err) {
      toast({
        title: "Upload failed",
        description:
          err instanceof Error ? err.message : "Failed to upload company logo.",
        variant: "destructive",
      });
    }
  }

  /* ── Early returns ────────────────────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-slate-400">
        Loading company profile…
      </div>
    );
  }

  if (isProfileError) {
    const message =
      profileError instanceof Error
        ? profileError.message
        : "Failed to load company profile. Please try again.";
    return <ErrorState message={message} onRetry={refetch} />;
  }

  /* ── Render ───────────────────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen bg-[#F3F4F6] py-6 px-4 md:px-8">
      <div className="mx-auto max-w-5xl space-y-4">

        {/* ── HERO CARD ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-5 shadow-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">

            {/* Logo */}
            <div className="relative h-16 w-16 shrink-0">
              <div className="h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                {logoUrl ? (
                  <div
                    role="img"
                    aria-label={`${company?.companyName || "Company"} logo`}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${logoUrl}")` }}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-300 to-slate-200 text-lg font-bold text-slate-600">
                    {company?.companyName?.[0]?.toUpperCase() || "C"}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                disabled={isUploadingLogo || !companyId}
                className="absolute -bottom-1 -right-1 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#1A6FA8] text-white shadow-sm transition hover:bg-[#155E92] disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Upload company logo"
              >
                {isUploadingLogo ? (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                ) : (
                  <Icon d={ICONS.camera} size={13} />
                )}
              </button>

              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>

            {/* Info */}
            <div className="min-w-0">
              <h1 className="break-words text-xl font-bold leading-tight text-slate-900">
                {company?.companyName || "Company Name"}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                {company?.description?.split(".")[0] || "Company tagline goes here"}
              </p>
              <div className="flex flex-wrap gap-4 mt-2.5 text-xs text-slate-500">
                {company?.address && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">
                      <Icon d={ICONS.pin} />
                    </span>
                    {company.address}
                  </span>
                )}
                {employeeRange && (
                  <span className="flex items-center gap-1">
                    <span className="text-slate-400">
                      <Icon d={ICONS.users} />
                    </span>
                    {employeeRange}
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleOpenEdit}
            className="flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#1A6FA8] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#155E92] active:scale-95 md:w-auto"
          >
            <Icon d={ICONS.edit} />
            Edit Profile
          </button>
        </div>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* LEFT column */}
          <div className="flex-1 min-w-0 space-y-4">

            {/* About */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-800 mb-3">About Us</h2>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {company?.description || "No company description provided yet."}
              </p>
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2">
                  Industry Sectors
                </p>
                <div className="flex flex-wrap gap-2">
                  {(company?.industry
                    ? company.industry.split(",").map((s: string) => s.trim())
                    : ["General"]
                  ).map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-[#1A6FA8] text-white text-[11px] font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Internships */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-800">
                  Active Internships
                </h2>

              </div>

              <div className="space-y-3">
                {(data?.internships as CompanyInternshipSummary[] | undefined)?.map(
                  (intern) => (
                    <div
                    key={intern.id}
                    className="border border-slate-100 rounded-xl p-4"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 shrink-0 overflow-hidden"
                          role="img"
                          aria-label={intern.internshipTitle ?? "Company thumbnail"}
                        >
                          {intern.thumbnail ? (
                            <img
                              src={intern.thumbnail}
                              alt={intern.internshipTitle ?? "Company thumbnail"}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800">
                            {intern.internshipTitle}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-slate-500">
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
                  )
                )}
              </div>
            </div>

            {/* Intern Reviews */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-sm font-bold text-slate-800 mb-5">
                Intern Reviews
              </h2>

              {/* Rating summary */}
         

              {/* Individual reviews */}
              <div className="space-y-4">
                {(data?.reviews as CompanyReviewSummary[] | undefined)?.map(
                  (r) => (
                    <div
                      key={r.id}
                      className="border border-slate-100 rounded-xl p-4"
                    >
                      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-slate-200 text-slate-700">
                            {r.user?.fullName
                              ?.split(" ")
                              ?.map((n: string) => n[0])
                              ?.join("")
                              ?.slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800">
                              {r.user?.fullName}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {new Date(r.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Stars rating={r.rating} size={14} />
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {r.comment}
                      </p>

                
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* RIGHT sidebar */}
          <div className="w-full lg:w-64 h-fit   shrink-0 flex flex-col justify-between bg-white rounded-2xl p-5 shadow-sm border border-slate-100 space-y-5">
            <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
              Company Details
            </h2>

         
            <DetailRow
              label="Headquarters"
              value={
                company?.address ||
                "100 Innovation Dr, San Francisco, CA 94103"
              }
            />
            <DetailRow label="Phone" value={company?.companyPhone} />
            <DetailRow
              label="Size"
              value={employeeRange || "500–1000 Employees"}
            />
        

            {company?.verificationStatus && (
              <div>
                <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1">
                  Verification
                </p>
                <span
                  className={`inline-block text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize ${
                    company.verificationStatus === "verified"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {company.verificationStatus}
                </span>
              </div>
            )}

            {/* Social profiles */}
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-2">
                Social Profiles
              </p>
              <div className="flex gap-2 flex-wrap">
                {["Facebook", "LinkedIn", "X", "Instagram", "WhatsApp"].map(
                  (s) => (
                    <SocialDot key={s} label={s} />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── EDIT MODAL ────────────────────────────────────────────────────── */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 flex text-black items-center justify-center z-50 p-4">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-4 shadow-xl sm:p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-slate-800">
                Edit Company Profile
              </h2>
              <button
                onClick={handleCloseEdit}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition"
              >
                <Icon d={ICONS.x} size={16} />
              </button>
            </div>

            {/* Error banner inside modal */}
            {isUpdateError && (
              <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-xs text-red-700">
                <span className="shrink-0 mt-0.5">
                  <Icon d={ICONS.x} size={14} />
                </span>
                <span>
                  {updateError instanceof Error
                    ? updateError.message
                    : "Failed to save changes. Please try again."}
                </span>
              </div>
            )}

            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Company Name"
                value={formData.companyName}
                onChange={(v) => setFormData({ ...formData, companyName: v })}
              />
              <Field
                label="Industry"
                value={formData.industry}
                onChange={(v) => setFormData({ ...formData, industry: v })}
              />
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#1A6FA8] focus:ring-2 focus:ring-[#1A6FA8]/10 transition resize-none"
                />
              </div>
              <Field
                label="Address"
                value={formData.address}
                onChange={(v) => setFormData({ ...formData, address: v })}
              />
              <Field
                label="Phone"
                value={formData.companyPhone}
                onChange={(v) => setFormData({ ...formData, companyPhone: v })}
              />
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                onClick={handleCloseEdit}
                disabled={isPending}
                className="border border-slate-200 text-slate-600 text-xs font-semibold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                onClick={handleSave}
                className="bg-[#1A6FA8] hover:bg-[#155E92] disabled:opacity-60 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition active:scale-95"
              >
                {isPending ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}