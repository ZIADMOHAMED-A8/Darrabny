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
    <section className="mt-10 rounded-2xl border border-[#0b1f33]/15 bg-white p-7 shadow-[0_18px_50px_rgba(16,24,40,0.14)] md:p-10">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Search */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 rounded-lg border border-[#0b1f33]/20 bg-[#f6f7fb] px-3 py-2 text-sm text-[#0b1f33]">
            <Search className="h-4 w-4 text-[#0b1f33]/45" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={`Keywords (e.g. "Software", "Marketing")`}
              className="w-full bg-transparent outline-none placeholder:text-[#0b1f33]/45"
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
          className="rounded-md border border-[#0b1f33]/15 bg-white px-6 py-2.5 text-sm font-semibold text-[#0b1f33] shadow-sm hover:bg-[#0b1f33]/5"
        >
          Clear
        </button>

        <button
          onClick={onApply}
          className="rounded-md bg-[var(--ds-primary)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--ds-primary-dark)]"
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
      className="w-full appearance-none rounded-lg border border-[#0b1f33]/20 bg-[#f6f7fb] px-3 py-2 text-sm text-[#0b1f33] outline-none"
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
