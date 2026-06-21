// _components/UniversitySection.tsx
"use client";

import { useState } from "react";
import { Pencil, Plus, Building2 } from "lucide-react";
import UniversitySelectModal from "./universitySelctModal";
import useGetLoginStudent from "@/app/student/settings/hooks/useGetLoginStudent";

interface University {
  _id: string;
  collegeName: string;
  collegeEmail?: string;
  address: string;
  logo: {
    secure_url: string;
  };
}

export default function UniversitySection({ isEditing }: { isEditing: boolean }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: userData, isLoading: userLoading } = useGetLoginStudent();

  // override محلي بعد ما اليوزر يضيف/يعدّل، عشان الـ UI يتحدث فورًا
  const [localCollege, setLocalCollege] = useState<University | null | undefined>(undefined);

  const college: University | null =
    localCollege !== undefined ? localCollege : userData?.college ?? null;

  const handleSelect = (uni: University) => {
    setLocalCollege(uni);
  };

  if (userLoading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-500">Loading university...</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-[#1a3d73]">University</h2>

        {isEditing && college && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit College
          </button>
        )}
      </div>

      {!college ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 py-8">
          <p className="text-sm text-slate-500">No university added yet.</p>
          {isEditing && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg bg-[#1176c8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0b67b0]"
            >
              <Plus className="h-4 w-4" />
              Add University
            </button>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e8eefc]">
            <Building2 className="h-5 w-5 text-[#1176c8]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1a3d73]">
              {college.collegeName}
            </p>
            <p className="text-xs text-slate-500">{college.address}</p>
          </div>
        </div>
      )}

      <UniversitySelectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelect}
      />
    </div>
  );
}