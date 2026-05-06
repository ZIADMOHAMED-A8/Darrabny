"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";

type Props = {
  q: string;
  specialization: string;
  skill: string;
  location: string;
  trainingType: string;
  duration: string;
  setQ: (v: string) => void;
  setSpecialization: (v: string) => void;
  setSkill: (v: string) => void;
  setLocation: (v: string) => void;
  setTrainingType: (v: string) => void;
  setDuration: (v: string) => void;
  onClear: () => void;
  onApply: () => void;
  SPECIALIZATIONS: string[];
  LOCATIONS: string[];
  TRAINING_TYPES: string[];
  DURATIONS: string[];
  SKILLS: string[];
};

export default function InternshipsFilters({
  q,
  specialization,
  skill,
  location,
  trainingType,
  duration,
  setQ,
  setSpecialization,
  setSkill,
  setLocation,
  setTrainingType,
  setDuration,
  onClear,
  onApply,
  SPECIALIZATIONS,
  LOCATIONS,
  TRAINING_TYPES,
  DURATIONS,
  SKILLS,
}: Props) {
  const [open, setOpen] = useState(false);

  const hasFilters =
    !!specialization || !!skill || !!location || !!trainingType || !!duration;

  function handleApply() {
    onApply();
    setOpen(false);
  }

  function handleClear() {
    onClear();
    setOpen(false);
  }

  return (
    <div className="mt-10">
      {/* Search bar row */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0b1f33]/40 pointer-events-none" />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or company…"
            className="h-12 w-full rounded-xl border border-[#0b1f33]/15 bg-white pl-11 pr-4 text-sm text-[#0b1f33] shadow-sm outline-none placeholder:text-[#0b1f33]/40 focus:border-[#0a79c9] focus:ring-2 focus:ring-[#0a79c9]/15 transition"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0b1f33]/40 hover:text-[#0b1f33]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filter toggle button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={[
            "relative flex h-12 items-center gap-2 rounded-xl border px-5 text-sm font-semibold shadow-sm transition",
            open || hasFilters
              ? "border-[#0a79c9] bg-[#0a79c9] text-white"
              : "border-[#0b1f33]/15 bg-white text-[#0b1f33] hover:border-[#0a79c9]/40",
          ].join(" ")}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasFilters && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-[#0a79c9]">
              {[specialization, skill, location, trainingType, duration].filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Expandable filters panel */}
      {open && (
        <div className="mt-3 overflow-hidden rounded-2xl border border-[#0b1f33]/12 bg-white shadow-[0_12px_40px_rgba(16,24,40,0.10)] animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid gap-6 p-6 md:grid-cols-3 lg:grid-cols-5">
            {/* Specialization */}
            <FilterSelect
              label="Specialization"
              value={specialization}
              onChange={setSpecialization}
              options={SPECIALIZATIONS}
              placeholder="All specializations"
            />

            {/* Location */}
            <FilterSelect
              label="Location"
              value={location}
              onChange={setLocation}
              options={LOCATIONS}
              placeholder="All locations"
            />

            {/* Training type */}
            <FilterSelect
              label="Training Type"
              value={trainingType}
              onChange={setTrainingType}
              options={TRAINING_TYPES}
              placeholder="All types"
            />

            {/* Duration */}
            <FilterSelect
              label="Duration"
              value={duration}
              onChange={setDuration}
              options={DURATIONS}
              placeholder="Any duration"
            />

            {/* Skills */}
            <FilterSelect
              label="Skill"
              value={skill}
              onChange={setSkill}
              options={SKILLS}
              placeholder="Any skill"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-[#0b1f33]/8 px-6 py-4">
            <button
              onClick={handleClear}
              className="rounded-lg px-5 py-2 text-sm font-semibold text-[#0b1f33]/60 hover:bg-[#0b1f33]/5 hover:text-[#0b1f33] transition"
            >
              Clear all
            </button>
            <button
              onClick={handleApply}
              className="rounded-lg bg-[#0a79c9] px-6 py-2 text-sm font-bold text-white shadow-sm hover:bg-[#085fa0] transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {hasFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[
            { label: specialization, clear: () => setSpecialization("") },
            { label: location, clear: () => setLocation("") },
            { label: trainingType, clear: () => setTrainingType("") },
            { label: duration, clear: () => setDuration("") },
            { label: skill, clear: () => setSkill("") },
          ]
            .filter((c) => !!c.label)
            .map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#0a79c9]/30 bg-[#eaf4ff] px-3 py-1 text-xs font-semibold text-[#0a79c9]"
              >
                {c.label}
                <button onClick={c.clear} className="hover:text-[#085fa0]">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
        </div>
      )}
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#0b1f33]/60">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-lg border border-[#0b1f33]/15 bg-[#f8fafc] px-3 text-sm text-[#0b1f33] outline-none focus:border-[#0a79c9] focus:ring-2 focus:ring-[#0a79c9]/15 transition cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}