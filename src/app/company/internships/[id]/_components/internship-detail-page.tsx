"use client";

import { useState } from "react";
import { X, CheckCircle2, Bookmark } from "lucide-react";
import { useRouter } from "next/navigation";
import InternshipPostForm from "../../_components/internship-post-form";
import { useDeleteInternship } from "../../_hooks/use-delete-internship";
import { useToast } from "@/hooks/use-toast";

type CompanyId = {
  _id: string;
  companyName: string;
};

type ReviewSummary = {
  averageRating: number;
  totalReviews: number;
};

type InternshipData = {
  data: {
    _id: string;
    internshipTitle: string;
    internshipLocation: string;
    workingTime: string;
    internshipDescription: string;
    isFeatured: boolean;
    technicalSkills: string[];
    softSkills: string[];
    status: string;
    startDate: string;
    durationInMonths: number;
    thumbnail: string | null;
    closed: boolean;
    companyId: CompanyId;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    reviewSummary: ReviewSummary;
  };
};

type InternshipApi = {
  json: InternshipData;
};

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-[#374151]">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1686E6]" />
      <span>{text}</span>
    </li>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="text-[20px] font-bold text-[#0B1B35] mb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function InternshipDetailPage({
  data,
}: {
  data: InternshipApi;
}) {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const { deleteInternship, isPending: isDeleting } = useDeleteInternship();
  const { toast } = useToast();
  const mode = "edit";

  const {
    data: {
      _id,
      internshipTitle,
      internshipLocation,
      workingTime,
      internshipDescription,
      technicalSkills,
      softSkills,
      durationInMonths,
      startDate,
      endDate,
      status,
      companyId,
      thumbnail,
    },
  } = data;

  const formattedStart = new Date(startDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
  const formattedEnd = new Date(endDate).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const workMode =
    internshipLocation === "onsite"
      ? "On-site"
      : internshipLocation === "hybrid"
        ? "Hybrid"
        : "Remote";

  return (
    <div className=" mx-auto px-4 py-2">

      {/* ── Job Card ── */}
    <div className="flex  justify-center">
    <div className="mt-7 flex items-center px-12 pl-2 py-4 h-fit pb-8 gap-4 mb-8  border border-[#E5E7EB] rounded-2xl  bg-white shadow-sm">
        <div className="w-[72px] h-[72px] rounded-xl overflow-hidden bg-[#F3F4F6] shrink-0">
          {thumbnail ? (
            <img src={thumbnail} alt={companyId.companyName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#9CA3AF]">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21V7l9-4 9 4v14M9 21V11h6v10" />
              </svg>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#6B7280]">{companyId.companyName}</p>
          <h2 className="text-[17px] font-bold text-[#0B1B35] mt-0.5 truncate">{internshipTitle}</h2>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B7280]">
            <span className="flex items-center gap-1">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {workMode}
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span className="flex items-center gap-1">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path strokeLinecap="round" d="M16 3v4M8 3v4M2 11h20" />
              </svg>
              {workingTime}
            </span>
            <span className="text-[#D1D5DB]">·</span>
            <span className="flex items-center gap-1">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {durationInMonths} months
            </span>
          </div>
        </div>


      </div>
    </div>

      {/* ── Detail Panel ── */}
      <div className="h-fit px-8 py-4 P mb-10 bg-white">

        {/* Header */}
        <div className="flex p-4 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h1 className="break-words text-2xl font-bold text-[#0B1B35] sm:text-[28px]">
              {internshipTitle}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
              <span>{companyId.companyName}</span>
              <span className="text-[#D1D5DB]">·</span>
              <span>{internshipLocation}</span>
              <span className="bg-[#1686E6] text-white px-3 py-0.5 rounded-full text-xs">
                {workingTime}
              </span>
              <span className="capitalize bg-[#F3F4F6] text-[#374151] px-3 py-0.5 rounded-full text-xs">
                {status}
              </span>
            </div>
          </div>
          <button className="self-start" onClick={() => router.back()}>
            <X />
          </button>
        </div>

        {/* Overview Tab */}
        <div className="mt-5 border-b border-[#E5E7EB]">
          <button className="pb-2 text-sm font-medium text-[#1686E6] border-b-2 border-[#1686E6]">
            Overview
          </button>
        </div>

        {/* About */}
        <Section title="About the Internship">
          <p className="text-[15px] text-[#374151]">{internshipDescription}</p>
        </Section>

        {/* Technical Skills */}
        {technicalSkills.length > 0 && (
          <Section title="Technical Skills">
            <ul className="grid gap-3 md:grid-cols-2">
              {technicalSkills.map((item, i) => (
                <CheckItem key={i} text={item} />
              ))}
            </ul>
          </Section>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <Section title="Soft Skills">
            <ul className="grid gap-3 md:grid-cols-2">
              {softSkills.map((item, i) => (
                <CheckItem key={i} text={item} />
              ))}
            </ul>
          </Section>
        )}

        {/* Details */}
        <Section title="Details">
          <ul className="space-y-2">
            <CheckItem text={`Duration: ${durationInMonths} months`} />
            <CheckItem text={`Timeline: ${formattedStart} – ${formattedEnd}`} />
          </ul>
        </Section>

        {/* Footer */}
        <div className="mt-8 flex flex-col gap-3 pb-8 sm:flex-row sm:justify-end">
          <button
            disabled={isDeleting}
            onClick={() => {
              if (!confirm("Are you sure you want to delete this internship?")) return;
              deleteInternship(_id, {
                onSuccess: () => {
                  toast({ title: "Internship deleted", description: "The internship has been deleted successfully." });
                  router.push("/company/internships");
                },
                onError: (error) => {
                  toast({ title: "Delete failed", description: error.message, variant: "destructive" });
                },
              });
            }}
            className="rounded-lg border border-red-200 px-6 py-2 text-sm text-red-600 transition hover:bg-red-50 disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            onClick={() => setOpenForm(true)}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#1686E6] px-6 py-2 text-sm text-white transition hover:bg-[#1270C4]"
          >
            ✎ Edit
          </button>
        </div>

        {/* Modal */}
        {openForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="relative z-50 max-h-[92vh] w-[920px] max-w-[95vw] overflow-y-auto rounded-[20px] shadow-2xl sm:rounded-[28px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <button onClick={() => setOpenForm(false)} className="absolute top-3 right-3">
                <X />
              </button>
              <InternshipPostForm
                mode={mode}
                internshipId={_id}
                defaultValues={data.data}
                onCancel={() => setOpenForm(false)}
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
}