import { PencilLine } from "lucide-react";

interface AboutSectionProps {
  isEditing?: boolean;
}

export default function AboutSection({ isEditing }: AboutSectionProps) {
  return (
    <section className="rounded-2xl border border-[#cdd9f2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#111f37]">About</h2>
        <button
          type="button"
          className="rounded-lg p-1.5 text-slate-700 transition hover:bg-slate-100"
          aria-label="Edit about"
        >
          {isEditing && <PencilLine className="h-5 w-5" />}
        </button>
      </div>
      <p className="text-lg leading-relaxed text-slate-700">
        Highly motivated computer science student with a passion
        for software development and a strong foundation in data
        structures and algorithms. Seeking an internship to apply
        my skills and contribute to innovative projects.
      </p>
    </section>
  );
}
