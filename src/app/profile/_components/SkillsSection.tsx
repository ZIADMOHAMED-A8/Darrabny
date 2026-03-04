"use client";

import { useMemo, useState } from "react";
import { CirclePlus, Loader2, X } from "lucide-react";
import Modal from "@/components/ui/Modal";
import useGetSkills from "../_hooks/useGetSkills";
import useAddSkill from "../_hooks/useAddSkill";
import useDeleteSkill from "../_hooks/useDeleteSkill";
import { useToast } from "@/hooks/use-toast";

interface SkillsSectionProps {
  isEditing?: boolean;
}

const toSkillValue = (item: unknown): string | null => {
  if (typeof item === "string" && item.trim().length > 0) return item;
  if (item && typeof item === "object") {
    const skill = (item as Record<string, unknown>).skill;
    if (typeof skill === "string" && skill.trim().length > 0) return skill;
  }
  return null;
};

const extractSkills = (payload: unknown): string[] => {
  if (Array.isArray(payload)) {
    return payload
      .map(toSkillValue)
      .filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }

  if (payload && typeof payload === "object") {
    const root = payload as Record<string, unknown>;
    const candidates = [root.data, root.skills, root.result, payload];

    for (const candidate of candidates) {
      if (!candidate) continue;

      if (Array.isArray(candidate)) {
        const mapped = candidate
          .map(toSkillValue)
          .filter((item): item is string => typeof item === "string" && item.trim().length > 0);

        if (mapped.length > 0) return mapped;
      }

      if (candidate && typeof candidate === "object") {
        const maybeSkills = (candidate as Record<string, unknown>).skills;
        if (Array.isArray(maybeSkills)) {
          const mapped = maybeSkills
            .map(toSkillValue)
            .filter((item): item is string => typeof item === "string" && item.trim().length > 0);

          if (mapped.length > 0) return mapped;
        }
      }
    }
  }

  return [];
};

export default function SkillsSection({ isEditing }: SkillsSectionProps) {
  const [open, setOpen] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const { toast } = useToast();
  const { data, isLoading, isError, error: getSkillsError } = useGetSkills();
  const { addSkill, isPending: isAdding, error: addSkillError } = useAddSkill();
  const { deleteSkill, isPending: isDeleting, error: deleteSkillError } = useDeleteSkill();

  const skills = useMemo(() => {
    return extractSkills(data);
  }, [data]);

  const handleAddSkill = async () => {
    const normalized = newSkill.trim();
    if (!normalized) {
      toast({
        title: "Skill is required",
        description: "Please enter a skill name before adding.",
        variant: "destructive",
      });
      return;
    }

    try {
      await addSkill({ skillName: normalized });
      setNewSkill("");
      setOpen(false);
      toast({
        title: "Skill added",
        description: `${normalized} was added to your profile.`,
      });
    } catch (error) {
      toast({
        title: "Failed to add skill",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteSkill = async (skill: string) => {
    try {
      await deleteSkill({ skill });
      toast({
        title: "Skill removed",
        description: `${skill} was removed from your profile.`,
      });
    } catch (error) {
      toast({
        title: "Failed to delete skill",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <section className="rounded-2xl border border-[#cdd9f2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
        <h2 className="mb-5 text-2xl font-bold text-[#111f37]">Skills</h2>

        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading skills...
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 items-center">
            {skills.length === 0 ? (
              <p className="text-sm text-slate-500">No skills found.</p>
            ) : (
              skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1e78c8] px-4 py-1.5 text-base font-medium text-white shadow-sm"
                >
                  {skill}
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => handleDeleteSkill(skill)}
                      disabled={isDeleting}
                      aria-label={`Delete ${skill}`}
                      className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/30 disabled:opacity-60"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  )}
                </span>
              ))
            )}

            {isEditing && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100"
                aria-label="Add new skill"
              >
                <CirclePlus className="h-6 w-6" />
              </button>
            )}
          </div>
        )}

        {isError && (
          
          <p className="mt-3 text-sm text-red-600">
            {getSkillsError instanceof Error
              ? getSkillsError.message
              : "Failed to load skills from backend."}
          </p>
        )}
        {addSkillError && (
          <p className="mt-2 text-sm text-red-600">
            {addSkillError.message || "Failed to add skill."}
          </p>
        )}
        {deleteSkillError && (
          <p className="mt-2 text-sm text-red-600">
            {deleteSkillError.message || "Failed to delete skill."}
          </p>
        )}
      </section>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h3 className="mb-4 text-lg font-semibold text-white">Add New Skill</h3>

        <input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g. React, Node.js"
          className="w-full rounded-lg border border-white/10 bg-[#052a4a] px-4 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg bg-white/10 px-4 py-2 text-white"
            disabled={isAdding}
          >
            Cancel
          </button>

          <button
            onClick={handleAddSkill}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
            disabled={isAdding}
          >
            {isAdding && <Loader2 className="h-4 w-4 animate-spin" />}
            Add Skill
          </button>
        </div>
      </Modal>
    </>
  );
}
