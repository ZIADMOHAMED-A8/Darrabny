"use client";

import { Search } from "lucide-react";

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
  return (
    <section className="mt-10 rounded-2xl border border-white/15 bg-white/5 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm text-slate-700">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Keywords (e.g. "Software", "Marketing")`}
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <Select
          value={specialization}
          onChange={setSpecialization}
          placeholder="Specialization"
          options={SPECIALIZATIONS}
        />
        <Select value={skill} onChange={setSkill} placeholder="Skills" options={SKILLS} />
        <Select
          value={location}
          onChange={setLocation}
          placeholder="Location"
          options={LOCATIONS}
        />
        <Select
          value={trainingType}
          onChange={setTrainingType}
          placeholder="Training Type"
          options={TRAINING_TYPES}
        />
        <Select value={duration} onChange={setDuration} placeholder="Duration" options={DURATIONS} />
      </div>

      <div className="mt-6 flex items-center justify-center gap-3">
        <button
          onClick={onClear}
          className="rounded-md bg-white px-5 py-2 text-sm font-semibold text-[#062845] hover:bg-white/90"
        >
          Clear
        </button>

        <button
          onClick={onApply}
          className="rounded-md bg-[#2196F3] px-5 py-2 text-sm font-semibold text-white hover:bg-[#1e88e5]"
        >
          Apply Filters
        </button>
      </div>
    </section>
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
