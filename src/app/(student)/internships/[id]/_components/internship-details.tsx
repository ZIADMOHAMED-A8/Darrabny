"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  CheckCircle2,
  Star,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import StudentFooter from "@/components/shared/student-footer";
import ApplyModal from "./apply-modal";

const SPECIALIZATIONS = ["Software", "Data", "Marketing", "UI/UX", "Finance", "Research"];
const LOCATIONS = ["Cairo", "Alexandria", "Giza", "Remote"];
const TRAINING_TYPES = ["Full-time", "Part-time"];
const DURATIONS = ["3 months", "6 months", "12 months"];
const SKILLS = ["React", "Tailwind", "SQL", "Python", "Figma", "Excel"];

type Review = {
  id: string;
  name: string;
  date: string;
  rating: number;
  text: string;
  up: number;
  down: number;
};

const REVIEWS: Review[] = [
  {
    id: "r1",
    name: "Sophia Carter",
    date: "July 15, 2023",
    rating: 5,
    text: "My internship at Innovate Solutions was an incredible experience. The team was supportive, and I learned a lot about software development. I highly recommend this company to future interns.",
    up: 25,
    down: 5,
  },
  {
    id: "r2",
    name: "Ethan Miller",
    date: "June 20, 2023",
    rating: 4,
    text: "I had a positive experience at Global Marketing. The projects were challenging, and I gained valuable insights into the marketing industry. However, the workload was quite demanding.",
    up: 18,
    down: 3,
  },
  {
    id: "r3",
    name: "Olivia Bennett",
    date: "May 5, 2023",
    rating: 3,
    text: "My internship at Creative Designs was average. The tasks were repetitive, and I didn't feel very challenged. The company culture was friendly, but I wish there were more opportunities for growth.",
    up: 12,
    down: 2,
  },
];

export default function InternshipDetails({ data }: { data: Internship }) {
  const [tab, setTab] = useState<"overview" | "reviews">("overview");
  const [applyOpen, setApplyOpen] = useState(false);

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

  function applyFilters() {
    // UI only for now
  }

  const rating = 4.5;
  const totalReviews = 125;

  return (
    <div className="relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #f8fbff 0%, #f3f7ff 45%, #eef4ff 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(6,48,88,0.10) 1px, rgba(255,255,255,0) 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute inset-0 opacity-[0.85]">
          <div className="absolute left-[-120px] top-24 h-[520px] w-[520px] rounded-full bg-[#d7e4ff]/70 blur-3xl" />
          <div className="absolute right-[-180px] top-64 h-[560px] w-[560px] rounded-full bg-[#c1d2ee]/55 blur-3xl" />
          <div className="absolute left-1/2 top-[520px] h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#d7e4ff]/55 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl py-10 md:py-14">
        {/* Filters */}
        <InternshipsFilters
          q={q}
          specialization={specialization}
          skill={skill}
          location={location}
          trainingType={trainingType}
          duration={duration}
          setQ={setQ}
          setSpecialization={setSpecialization}
          setSkill={setSkill}
          setLocation={setLocation}
          setTrainingType={setTrainingType}
          setDuration={setDuration}
          onClear={clearFilters}
          onApply={applyFilters}
          SPECIALIZATIONS={SPECIALIZATIONS}
          LOCATIONS={LOCATIONS}
          TRAINING_TYPES={TRAINING_TYPES}
          DURATIONS={DURATIONS}
          SKILLS={SKILLS}
        />

        {/* Small card */}
        <div className="mt-10 flex justify-center">
          <div className="w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#0b1f33]/15 bg-white shadow-[0_18px_50px_rgba(16,24,40,0.12)]">
            <div className="flex gap-4 p-4">
              <div className="relative h-20 w-24 overflow-hidden rounded-xl bg-[#f6f7fb]">
                <Image src={data.image} alt={data.title} fill className="object-cover" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#0b1f33]/60">{data.company}</p>
                <h3 className="truncate text-base font-extrabold text-[#0b1f33]">
                  {data.title}
                </h3>

                <div className="mt-2 text-xs text-[#0b1f33]/60">
                  <span>{data.workMode}</span>
                  <span className="mx-2">•</span>
                  <span>{data.type}</span>
                  <span className="mx-2">•</span>
                  <span>{data.duration}</span>
                </div>
              </div>

              <div className="grid place-items-center text-[#0b1f33]/60">
                <span className="h-5 w-5 rounded border border-[#0b1f33]/25" />
              </div>
            </div>
          </div>
        </div>

        {/* Big details panel */}
        <section className="relative mt-12 overflow-hidden rounded-2xl border border-[#0b1f33]/12 bg-white shadow-[0_22px_70px_rgba(16,24,40,0.16)]">
          <Link
            href="/internships"
            aria-label="Close"
            className="absolute right-8 top-8 text-[#0b1f33]/60 hover:text-[#0b1f33]"
          >
            <X className="h-9 w-9" />
          </Link>

          <div className="px-10 pt-10 md:px-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-[#0b1f33] md:text-5xl">
              {data.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#0b1f33]/55">
              <span>{data.company}</span>
              <span className="text-[#0b1f33]/35">|</span>
              <span>{data.workMode}</span>
              <span className="inline-flex items-center rounded-full bg-[#5865d7] px-3 py-1 text-xs font-semibold text-white">
                {data.workMode}
              </span>
              <span className="text-[#0b1f33]/35">{data.posted}</span>
            </div>

            <div className="mt-10 flex items-end gap-8 text-sm font-semibold">
              <button
                onClick={() => setTab("overview")}
                className={
                  tab === "overview"
                    ? "text-[#0a79c9]"
                    : "text-[#0b1f33]/55 hover:text-[#0b1f33]"
                }
              >
                Overview
                {tab === "overview" && (
                  <span className="mt-2 block h-[2px] w-[86px] bg-[#0a79c9]" />
                )}
              </button>

              <button
                onClick={() => setTab("reviews")}
                className={
                  tab === "reviews"
                    ? "text-[#0a79c9]"
                    : "text-[#0b1f33]/55 hover:text-[#0b1f33]"
                }
              >
                Reviews
                {tab === "reviews" && (
                  <span className="mt-2 block h-[2px] w-[70px] bg-[#0a79c9]" />
                )}
              </button>
            </div>

            <div className="mt-4 h-px w-full bg-[#0b1f33]/10" />
          </div>

          <div className="px-10 pb-10 pt-10 md:px-12">
            {tab === "overview" ? (
              <>
                <h2 className="text-2xl font-extrabold text-[#0b1f33]">
                  About the Internship
                </h2>
                <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#0b1f33]/70">
                  {data.about}
                </p>

                <div className="mt-12 grid gap-12 md:grid-cols-2">
                  <div>
                    <h3 className="text-2xl font-extrabold text-[#0b1f33]">
                      Responsibilities
                    </h3>

                    <ul className="mt-6 space-y-4 text-[15px] text-[#0b1f33]/70">
                      {data.responsibilities.map((item) => (
                        <li key={item} className="flex gap-3">
                          <CheckCircle2 className="mt-[2px] h-5 w-5 text-[#0a79c9]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-14 text-2xl font-extrabold text-[#0b1f33]">
                      Company Information
                    </h3>
                    <p className="mt-4 text-[15px] leading-7 text-[#0b1f33]/70">
                      {data.companyInfo}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-extrabold text-[#0b1f33]">
                      Requirements
                    </h3>

                    <ul className="mt-6 space-y-4 text-[15px] text-[#0b1f33]/70">
                      {data.requirements.map((item) => (
                        <li key={item} className="flex gap-3">
                          <CheckCircle2 className="mt-[2px] h-5 w-5 text-[#0a79c9]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <h3 className="mt-14 text-2xl font-extrabold text-[#0b1f33]">
                      Benefits
                    </h3>

                    <ul className="mt-6 space-y-4 text-[15px] text-[#0b1f33]/70">
                      {data.benefits.map((item) => (
                        <li key={item} className="flex gap-3">
                          <CheckCircle2 className="mt-[2px] h-5 w-5 text-[#0a79c9]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-14 flex items-center justify-end gap-3">
                  <button className="rounded-md border border-[#0b1f33]/15 bg-white px-6 py-2.5 text-sm font-semibold text-[#0b1f33] shadow-sm hover:bg-[#0b1f33]/5">
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setApplyOpen(true)}
                    className="rounded-md bg-[var(--ds-primary)] px-7 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[var(--ds-primary-dark)]"
                  >
                    Apply Now
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-8">
                <div className="rounded-2xl border border-[#0b1f33]/10 bg-white px-8 py-8 shadow-sm">
                  <div className="grid gap-8 md:grid-cols-[280px_1fr] md:items-center">
                    <div>
                      <div className="text-6xl font-extrabold text-[#0b1f33]">
                        {rating}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={[
                              "h-6 w-6",
                              i < 4 ? "fill-[#f5b400] text-[#f5b400]" : "text-[#0b1f33]/15",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                      <div className="mt-2 text-sm text-[#0b1f33]/55">
                        Based on {totalReviews} reviews
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { label: 5, pct: 40 },
                        { label: 4, pct: 30 },
                        { label: 3, pct: 15 },
                        { label: 2, pct: 10 },
                        { label: 1, pct: 5 },
                      ].map((r) => (
                        <div key={r.label} className="grid grid-cols-[18px_1fr_40px] items-center gap-4">
                          <div className="text-sm font-semibold text-[#0b1f33]/60">
                            {r.label}
                          </div>
                          <div className="h-2 w-full rounded-full bg-[#e9f1ff]">
                            <div
                              className="h-2 rounded-full bg-[#1f7ed6]"
                              style={{ width: `${r.pct}%` }}
                            />
                          </div>
                          <div className="text-right text-sm text-[#0b1f33]/55">
                            {r.pct}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {REVIEWS.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-[#0b1f33]/10 bg-white px-8 py-8 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full bg-[#f1f5ff]" />
                        <div>
                          <div className="text-sm font-semibold text-[#0b1f33]">
                            {r.name}
                          </div>
                          <div className="text-sm text-[#0b1f33]/55">
                            {r.date}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={[
                              "h-5 w-5",
                              i < r.rating ? "fill-[#f5b400] text-[#f5b400]" : "text-[#0b1f33]/15",
                            ].join(" ")}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-6 text-[15px] leading-7 text-[#0b1f33]/70">
                      {r.text}
                    </p>

                    <div className="mt-6 flex items-center gap-6 text-sm text-[#0b1f33]/55">
                      <div className="inline-flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5" /> {r.up}
                      </div>
                      <div className="inline-flex items-center gap-2">
                        <ThumbsDown className="h-5 w-5" /> {r.down}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <StudentFooter />
      </div>

      <ApplyModal
        open={applyOpen}
        onClose={() => setApplyOpen(false)}
        internship={{
          title: data.title,
          company: data.company,
          image: data.image,
        }}
      />
    </div>
  );
}
