// _components/UniversitySelectModal.tsx
"use client";

import { useState } from "react";
import useAddUniversity from "../_hooks/useAddUniversity"; // عدّل المسار حسب مكانه
import { Loader2, ChevronDown } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { useUniversities } from "@/app/company/partners/hooks/use-universities";
import useGetLoginStudent from "@/app/student/settings/hooks/useGetLoginStudent";
interface University {
  _id: string;
  collegeName: string;
  collegeEmail: string;
  address: string;
  logo: {
    secure_url: string;
  };
}

export default function UniversitySelectModal({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (university: University) => void;
}) {
  const { data, isLoading, isError, error } = useUniversities();

  const [selectedId, setSelectedId] = useState<string>("");
  const { mutate, isPending, isError: isAddError, error: addError } = useAddUniversity();

  const universities: University[] = data ?? [];

  const handleConfirm = () => {
    const selected = universities.find((u) => u._id === selectedId);
    if (!selected) return;

    mutate(selected._id, {
      onSuccess: () => {
        onSelect(selected); // يحدّث الـ UI المحلي في UniversitySection
        setSelectedId("");
        onClose();
      },
    });
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold text-white">Select University</h2>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 py-6 text-white/80">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading universities...</span>
          </div>
        )}

        {isError && (
          <p className="text-sm font-medium text-red-400">
            {error instanceof Error ? error.message : "Failed to load universities."}
          </p>
        )}

        {!isLoading && !isError && (
          <div className="relative">
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              disabled={isPending}
              className="w-full appearance-none rounded-xl border border-white/10 bg-[#06294a] px-4 py-3 pr-10 text-sm text-white outline-none focus:border-[#1176c8] disabled:opacity-50"
            >
              <option value="" disabled>
                -- Select a university --
              </option>
              {universities.map((uni) => (
                <option key={uni._id} value={uni._id}>
                  {uni.collegeName}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          </div>
        )}

        {isAddError && (
          <p className="text-sm font-medium text-red-400">
            {addError instanceof Error ? addError.message : "Failed to add university."}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isPending}
            className="rounded-lg border border-white/10 px-5 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedId || isPending}
            className="flex items-center gap-2 rounded-lg bg-[#1176c8] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0b67b0] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}