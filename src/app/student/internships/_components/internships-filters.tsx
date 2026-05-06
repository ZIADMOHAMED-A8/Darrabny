"use client";

import { Search, X } from "lucide-react";
import { useSearchInternships } from "../hooks/use-search-internships";
import { useEffect, useState } from "react";

type Props = {
  onResults: (data: any[] | null) => void;
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

  const [filters, setFilters] = useState<any>(null);

  const { data, isLoading, isError } = useSearchInternships(filters);

  useEffect(() => {
    if (data !== undefined) {
      onResults(data);
    }
  }, [data]);

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
    <section className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur shadow-sm p-6 md:p-7">
      
      {/* Search */}
      <div className="flex items-center gap-2 border border-slate-200 bg-white px-3 py-2.5 rounded-lg">
        <Search className="h-4 w-4 text-slate-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search internships..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Filters */}
      <div className="grid gap-4 mt-4 md:grid-cols-3">

        {/* Skills (multi select) */}
        <div>
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
        <div>
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
        <div>
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
        <div>
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
      <div className="mt-6 flex gap-3 justify-center">
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
