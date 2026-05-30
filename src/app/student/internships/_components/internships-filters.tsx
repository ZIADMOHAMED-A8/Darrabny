"use client";

import { Search, X } from "lucide-react";
import { useSearchInternships } from "../hooks/use-search-internships";
import { useEffect, useState } from "react";

type Props = {
  onResults: (data: unknown[] | null) => void;
};

const SKILLS = ["React", "Node.js", "Python", "SQL"];
const LOCATIONS = ["onsite", "remote", "hybrid"];
const TYPES = ["full-time", "part-time"];
const DURATIONS = ["1", "3", "6", "12"];

export default function InternshipsFilters({ onResults }: Props) {
  const [q, setQ] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [duration, setDuration] = useState("");

  const [filters, setFilters] = useState<{
    q: string;
    technicalSkills?: string;
    workingTime?: string;
    durationInMonths?: number;
    internshipLocation?: string;
  } | null>(null);

  const { data, isLoading, isError } = useSearchInternships(filters);

  useEffect(() => {
    if (data !== undefined) {
      onResults(data);
    }
  }, [data, onResults]);

  function toggleSkill(skill: string) {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  }

  function applyFilters() {
    setFilters({
      q,
      technicalSkills: skills.length ? skills.join(",") : undefined,
      workingTime: trainingType || undefined,
      durationInMonths: duration ? Number(duration) : undefined,
      internshipLocation: location || undefined,
    });
  }

  function clearFilters() {
    setQ("");
    setSkills([]);
    setLocation("");
    setTrainingType("");
    setDuration("");
    setFilters(null);
    onResults(null);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur sm:p-6 md:p-7">
      
      {/* Row 1: search, skills, location — Row 2: type, duration (each 1/3 width) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {/* Search */}
        <div className="min-w-0">
          <label className="text-xs text-slate-500">Search</label>
          <div className="flex min-w-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search internships..."
              className="w-full min-w-0 outline-none text-sm"
            />
          </div>
        </div>

        {/* Skills (multi select) */}
        <div className="min-w-0">
          <label className="text-xs text-slate-500">Skills</label>
          <select
            onChange={(e) => {
              
              if(e.target.value===''){
                console.log('gazr')
                return
              }
              toggleSkill(e.target.value)
            }}
            className="w-full border border-slate-200 bg-white p-2.5 rounded-lg text-sm"
          >
            <option value="">Select skill</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="min-w-0">
          <label className="text-xs text-slate-500">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-slate-200 bg-white p-2.5 rounded-lg text-sm"
          >
            <option value="">All</option>
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="min-w-0">
          <label className="text-xs text-slate-500">Training Type</label>
          <select
            value={trainingType}
            onChange={(e) => setTrainingType(e.target.value)}
            className="w-full border border-slate-200 bg-white p-2.5 rounded-lg text-sm"
          >
            <option value="">All</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Duration */}
        <div className="min-w-0">
          <label className="text-xs text-slate-500">Duration</label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full border border-slate-200 bg-white p-2.5 rounded-lg text-sm"
          >
            <option value="">All</option>
            {DURATIONS.map((d) => (
              <option key={d} value={d}>
                {d} months
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected skills */}
      {skills.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((s) => (
            <div
              key={s}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs"
            >
              {s}
              <button onClick={() => toggleSkill(s)}>
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={applyFilters}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* states */}
      {isLoading && <div className="text-center mt-4">Loading...</div>}
      {isError && <div className="text-center mt-4 text-red-500">Error</div>}
    </section>
  );
}
