"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Bookmark,
  Briefcase,
  Building2,
  Clock,
  MapPin,
} from "lucide-react";
import InternshipsFilters from "./_components/internships-filters";
import StudentFooter from "@/components/shared/student-footer";

type Internship = {
  id: string;
  company: string;
  title: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  type: "Full-time" | "Part-time";
  duration: string;
  match?: number;
  reason?: string;
  image?: string;
};

const INTERNSHIPS: Internship[] = [
  {
    id: "1",
    company: "Tech Innovators Inc.",
    title: "Software Engineering Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "3 months",
    match: 98,
    reason:
      'Your recent "E-commerce Dashboard" project used React and Tailwind, which are the primary tech stack for this role.',
    image: "/home/featured-internships/Img-1.png",
  },
  {
    id: "2",
    company: "Tech Innovators Inc.",
    title: "Data Analysis Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "3 months",
    match: 98,
    reason:
      "Strong fit for analytical thinking + dashboards and reporting. Your projects show consistent data work.",
    image: "/home/featured-internships/Img-2.png",
  },
  {
    id: "3",
    company: "Tech Innovators Inc.",
    title: "Software Engineering Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "3 months",
    image: "/home/featured-internships/Img-1.png",
  },
  {
    id: "4",
    company: "Creative Solutions Agency",
    title: "Marketing Intern",
    workMode: "Hybrid",
    type: "Part-time",
    duration: "6 months",
    image: "/home/featured-internships/Img-3.png",
  },
  {
    id: "5",
    company: "Data Insights Corp.",
    title: "Data Analysis Intern",
    workMode: "On-site",
    type: "Full-time",
    duration: "3 months",
    image: "/home/featured-internships/Img-2.png",
  },
  {
    id: "6",
    company: "Global Finance Group",
    title: "Financial Analyst Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "6 months",
    image: "/home/featured-internships/Img-1.png",
  },
  {
    id: "7",
    company: "Healthcare Innovations Lab",
    title: "Research Intern",
    workMode: "On-site",
    type: "Part-time",
    duration: "12 months",
    image: "/home/featured-internships/Img-3.png",
  },
  {
    id: "8",
    company: "Future Tech Solutions",
    title: "UI/UX Design Intern",
    workMode: "Hybrid",
    type: "Full-time",
    duration: "3 months",
    image: "/home/featured-internships/Img-2.png",
  },
];

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

export default function InternshipsPage() {
  const [q, setQ] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [duration, setDuration] = useState("");

  const [page, setPage] = useState(1);
  const perPage = 6;

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();

    return INTERNSHIPS.filter((it) => {
      const textOk =
        !text ||
        it.title.toLowerCase().includes(text) ||
        it.company.toLowerCase().includes(text);

      const specOk =
        !specialization ||
        it.title.toLowerCase().includes(specialization.toLowerCase());
      const typeOk = !trainingType || it.type === trainingType;
      const durOk = !duration || it.duration === duration;
      const locOk =
        !location || (location === "Remote" ? it.workMode === "Remote" : true);
      const skillOk = !skill; // Placeholder: wire to real data later

      return textOk && specOk && typeOk && durOk && locOk && skillOk;
    });
  }, [q, specialization, trainingType, duration, location, skill]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  function clearFilters() {
    setQ("");
    setSpecialization("");
    setSkill("");
    setLocation("");
    setTrainingType("");
    setDuration("");
    setPage(1);
  }

  function applyFilters() {
    setPage(1);
  }

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
        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-[#0b1f33] drop-shadow-sm md:text-6xl">
            Explore{" "}
            <span className="bg-gradient-to-r from-[#0a79c9] to-[#3aa5ff] bg-clip-text text-transparent">
              Internship
            </span>{" "}
            Opportunities
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm text-[#0b1f33]/70 md:text-base">
            Find the perfect internship to kickstart your career. Use the
            filters below to narrow down your search and discover opportunities
            that match your interests and skills.
          </p>
        </div>

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

        {/* Section title */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-[#0b1f33] md:text-3xl">
            Recommended Internships
          </h2>
          <div className="mt-4 h-px w-full bg-[#0b1f33]/10" />
        </div>

        {/* Grid */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          {slice.map((it, idx) => (
            <InternshipCard key={it.id} it={it} priority={idx < 2} />
          ))}
        </section>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-[#0b1f33]/70">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-md hover:bg-[#0b1f33]/5"
          >
            ‹ Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
              const p = i + 1;
              const active = p === page;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={[
                    "h-9 w-9 rounded-md",
                    active
                      ? "bg-[#0b1f33] text-white"
                      : "hover:bg-[#0b1f33]/5",
                  ].join(" ")}
                >
                  {p}
                </button>
              );
            })}
            {totalPages > 5 && <span className="px-2">…</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setPage(totalPages)}
                className="h-9 w-9 rounded-md hover:bg-[#0b1f33]/5"
              >
                {totalPages}
              </button>
            )}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded-md hover:bg-white/10"
          >
            Next ›
          </button>
        </div>

        <StudentFooter />
      </div>
    </div>
  );
}

function InternshipCard({
  it,
  priority,
}: {
  it: Internship;
  priority?: boolean;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#0b1f33]/15 bg-white shadow-[0_18px_50px_rgba(16,24,40,0.12)]">
      {/* Match ribbon */}
      {typeof it.match === "number" && (
        <div className="absolute -right-10 top-6 rotate-45 bg-[#2196F3] px-10 py-1 text-xs font-bold text-white shadow">
          {it.match}% Match
        </div>
      )}

      <div className="flex gap-4 p-4 md:p-5">
        {/* Image */}
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-[#f6f7fb]">
          {it.image ? (
            <Image
              src={it.image}
              alt={it.title}
              fill
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="h-full w-full grid place-items-center text-slate-400">
              <Building2 className="h-6 w-6" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#0b1f33]/60">{it.company}</p>
          <h3 className="mt-0.5 truncate text-base font-extrabold text-[#0b1f33] md:text-lg">
            {it.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-[#0b1f33]/60">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {it.workMode}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3.5 w-3.5" /> {it.type}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {it.duration}
            </span>
          </div>

          {/* Reason */}
          {it.reason && (
            <div className="mt-3 rounded-xl bg-[#eaf2ff] px-3 py-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#0b3b6b]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white shadow-sm">
                  <Briefcase className="h-3.5 w-3.5 text-[#0a79c9]" />
                </span>
                WHY THIS MATCHES YOU
              </div>
              <p className="mt-1 text-xs text-[#0b3b6b]/90 line-clamp-2">
                {it.reason}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              href={`/internships/${it.id}`}
              className="inline-flex items-center justify-center rounded-md bg-[var(--ds-primary)] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[var(--ds-primary-dark)]"
            >
              View Details
            </Link>

            <button
              aria-label="Save"
              className="rounded-md p-2 text-[#0b1f33]/60 hover:bg-[#0b1f33]/5 hover:text-[#0b1f33]"
            >
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

