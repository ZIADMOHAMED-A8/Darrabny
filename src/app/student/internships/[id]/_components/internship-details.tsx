"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

/* Filters data */
const SPECIALIZATIONS = [
  "Software",
  "Data",
  "Marketing",
  "UI/UX",
  "Finance",
  "Research",
];
const LOCATIONS = ["Cairo", "Alexandria", "Giza", "Remote"];
const TRAINING_TYPES = ["Full-time", "Part-time"];
const DURATIONS = ["3 months", "6 months", "12 months"];
const SKILLS = ["React", "Tailwind", "SQL", "Python", "Figma", "Excel"];

type Props = {
  data: any;
  role: "user" | "company";
};

export default function InternshipDetails({ data, role }: Props) {
  const [tab, setTab] = useState<"overview" | "reviews" | "applicants">("overview");

  /* Filters state */
  const [q, setQ] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [duration, setDuration] = useState("");

  function clearFilters() {
    setQ("");
    setSpecialization("");
    setSkill("");
    setLocation("");
    setTrainingType("");
    setDuration("");
  }

  function applyFilters() {}

  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      <div className="relative z-10 pt-6 pb-16">

        {/* Small internship card */}
        <div className="mt-7 flex justify-center">
          <div className="w-full max-w-[560px] rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_14px_40px_rgba(0,0,0,0.25)]">
            <div className="flex gap-4 p-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white">
                <Image
                  src={data.thumbnail}
                  alt={data.internshipTittle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-600">
                  {data.companyId?.companyName}
                </p>
                <h3 className="text-base font-extrabold">
                  {data.internshipTittle}
                </h3>

                <div className="mt-2 text-xs text-slate-600">
                  <span>{data.internshipLocation}</span>
                  <span className="mx-2">•</span>
                  <span>{data.workingTime}</span>
                  <span className="mx-2">•</span>
                  <span>{data.durationInMonths} months</span>
                </div>
              </div>

              <div className="grid place-items-center text-[#0b1f33]/60">
                <span className="h-5 w-5 rounded border border-[#0b1f33]/20" />
              </div>
            </div>
          </div>
        </div>

        {/* Big details panel */}
        <section className="mt-10 rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden">
          
          {/* Top */}
          <div className="relative px-12 pt-10">
            <Link
              href="/internships"
              className="absolute right-10 top-8 text-[#0b1f33]/70 hover:text-[#0b1f33]"
            >
              <X className="h-8 w-8" />
            </Link>

            <h1 className="text-[40px] font-extrabold">
              {data.internshipTittle}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#0b1f33]/55">
              <span>{data.companyId?.companyName}</span>
              <span>|</span>
              <span>{data.internshipLocation}</span>

              <span className="ml-2 rounded-full bg-[#5a67d8] px-3 py-1 text-xs font-bold text-white">
                {data.workingTime}
              </span>

              <span className="ml-2">{data.postedAgo}</span>
            </div>

            {/* Tabs */}
            <div className="mt-10 flex items-end gap-8 text-sm font-semibold">
              
              <button
                onClick={() => setTab("overview")}
                className={tab === "overview" ? "text-[#1f7ed6]" : "text-[#0b1f33]/55"}
              >
                Overview
                {tab === "overview" && (
                  <span className="mt-2 block h-[2px] w-[86px] bg-[#1f7ed6]" />
                )}
              </button>

              {role === "user" && (
                <button
                  onClick={() => setTab("reviews")}
                  className={tab === "reviews" ? "text-[#1f7ed6]" : "text-[#0b1f33]/55"}
                >
                  Reviews
                  {tab === "reviews" && (
                    <span className="mt-2 block h-[2px] w-[70px] bg-[#1f7ed6]" />
                  )}
                </button>
              )}

              {role === "company" && (
                <button
                  onClick={() => setTab("applicants")}
                  className={tab === "applicants" ? "text-[#1f7ed6]" : "text-[#0b1f33]/55"}
                >
                  Applicants
                  {tab === "applicants" && (
                    <span className="mt-2 block h-[2px] w-[90px] bg-[#1f7ed6]" />
                  )}
                </button>
              )}
            </div>

            <div className="mt-4 h-px w-full bg-[#0b1f33]/15" />
          </div>

          {/* Content */}
          <div className="px-12 pb-10 pt-8">
            
            {tab === "overview" && (
              <>
                <h2 className="text-2xl font-extrabold">About</h2>
                <p className="mt-4 text-[#0b1f33]/75">
                  {data.internshipDescription}
                </p>
              </>
            )}

            {tab === "reviews" && role === "user" && (
              <div>No reviews yet</div>
            )}

            {tab === "applicants" && role === "company" && (
              <div>Applicants list here (later)</div>
            )}

            {/* Bottom Actions */}
            <div className="mt-14 flex justify-end gap-3">
              
              {role === "user" && (
                <>
                  <button className="bg-white px-6 py-2.5 rounded-md">
                    Save
                  </button>
                  <button className="bg-[#1f7ed6] text-white px-7 py-2.5 rounded-md">
                    Apply Now
                  </button>
                </>
              )}

              {role === "company" && (
                <>
                  <button className="bg-yellow-500 text-white px-6 py-2.5 rounded-md">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-6 py-2.5 rounded-md">
                    Close
                  </button>
                </>
              )}

            </div>
          </div>
        </section>
      </div>
    </main>
  );
}