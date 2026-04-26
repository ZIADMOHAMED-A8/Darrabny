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
      "Your recent “E-commerce Dashboard” project used React and Tailwind, which are the primary tech stack for this role.",
    image: "/images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
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
    image: "/images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
  },
  {
    id: "3",
    company: "Tech Innovators Inc.",
    title: "Software Engineering Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "3 months",
    image: "/images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: "4",
    company: "Creative Solutions Agency",
    title: "Marketing Intern",
    workMode: "Hybrid",
    type: "Part-time",
    duration: "6 months",
    image: "/images.unsplash.com/photo-1526481280695-3c687fd5432c?w=800&q=80",
  },
  {
    id: "5",
    company: "Data Insights Corp.",
    title: "Data Analysis Intern",
    workMode: "On-site",
    type: "Full-time",
    duration: "3 months",
    image: "/images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: "6",
    company: "Global Finance Group",
    title: "Financial Analyst Intern",
    workMode: "Remote",
    type: "Full-time",
    duration: "6 months",
    image: "/images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80",
  },
  {
    id: "7",
    company: "Healthcare Innovations Lab",
    title: "Research Intern",
    workMode: "On-site",
    type: "Part-time",
    duration: "12 months",
    image: "/images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
  },
  {
    id: "8",
    company: "Future Tech Solutions",
    title: "UI/UX Design Intern",
    workMode: "Hybrid",
    type: "Full-time",
    duration: "3 months",
    image: "/images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80",
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
      <div className="absolute inset-0 -z-10 bg-[var(--ic-bg)]" />
      <div className="absolute inset-0 -z-10 opacity-70">
        <div className="absolute right-0 top-32 h-[520px] w-[520px] rounded-full bg-[#2196F3]/15 blur-3xl" />
        <div className="absolute left-0 bottom-0 h-[520px] w-[520px] rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="mx-auto px-16 py-10">
        {/* Hero */}
        <div className="text-center">
          <h1 className="mx-auto inline-flex rounded-2xl bg-white/10 px-8 py-4 text-3xl md:text-5xl font-extrabold tracking-tight text-white shadow-sm">
            Explore&nbsp;
            <span className="text-white">Internship</span>&nbsp;Opportunities
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base text-white/80">
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
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Recommended Internships
          </h2>
          <div className="mt-4 h-px w-full bg-white/15" />
        </div>

        {/* Grid */}
        <section className="mt-6 grid gap-6 md:grid-cols-2">
          {slice.map((it, idx) => (
            <InternshipCard key={it.id} it={it} priority={idx < 2} />
          ))}
        </section>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-white/80">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-2 rounded-md hover:bg-white/10"
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
                    active ? "bg-black/40 text-white" : "hover:bg-white/10",
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
                className="h-9 w-9 rounded-md hover:bg-white/10"
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
    <div className="relative rounded-2xl bg-[#dbeafe] text-[#062845] shadow-[0_10px_30px_rgba(0,0,0,0.25)] overflow-hidden">
      {/* Match ribbon */}
      {typeof it.match === "number" && (
        <div className="absolute -right-10 top-6 rotate-45 bg-[#2196F3] px-10 py-1 text-xs font-bold text-white shadow">
          {it.match}% Match
        </div>
      )}

      <div className="flex gap-4 p-4">
        {/* Image */}
        <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-white">
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
          <p className="text-xs font-semibold text-slate-600">{it.company}</p>
          <h3 className="mt-0.5 text-base md:text-lg font-extrabold truncate">
            {it.title}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600">
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
            <div className="mt-3 rounded-xl bg-[#c7ddff] px-3 py-2">
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#0b3b6b]">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/70">
                  <Briefcase className="h-3.5 w-3.5" />
                </span>
                WHY THIS MATCHES YOU
              </div>
              <p className="mt-1 text-xs text-[#0b3b6b]/90 line-clamp-2">
                {it.reason}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between">
            <Link
              href={`/internships/${it.id}`}
              className="inline-flex items-center justify-center rounded-md bg-[#1f7ed6] px-4 py-2 text-xs font-bold text-white hover:bg-[#1b72c2]"
            >
              View Details
            </Link>

            <button
              aria-label="Save"
              className="rounded-md p-2 text-[#062845]/70 hover:bg-black/5 hover:text-[#062845]"
            >
              <Bookmark className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Select({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-700 outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
