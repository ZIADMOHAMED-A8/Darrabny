"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  FileText,
  Mail,
  Trash2,
  User,
  X,
} from "lucide-react";
import useGetApplyProfile from "../../hooks/useGetApplyProfile";
import { useToast } from "@/hooks/use-toast";
import useApplyToInternship from "../hooks/use-apply-to-internship";

type Props = {
  open: boolean;
  onClose: () => void;
  internshipId: string;
  internship: {
    title: string;
    company: string;
    image: string;
  };
};

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

const extractUser = (payload: unknown) => {
  const root = payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
  const userPayload = root.data ?? root.user ?? payload;
  const user =
    userPayload && typeof userPayload === "object"
      ? (userPayload as Record<string, unknown>)
      : {};

  const firstName = user.firstName;
  const lastName = user.lastName;
  const fullNameFromParts = [firstName, lastName].filter(Boolean).join(" ").trim();

  const fullName =
    user.name ||
    user.fullName ||
    fullNameFromParts ||
    "Student";

  const email =
    user.email ||
    user.Email ||
    user.mail ||
    "";

  return { fullName: String(fullName), email: String(email) };
};

const extractResumeUrl = (payload: unknown): string | null => {
  if (!payload) return null;
  if (payload && typeof payload === "object") {
    const resume = payload as Record<string, unknown>;
    const url = resume.downloadUrl || resume.url;
    if (typeof url === "string" && url.trim().length > 0) return url;
  }
  return null;
};

export default function ApplyModal({
  open,
  onClose,
  internshipId,
  internship,
}: Props) {
  const { toast } = useToast();
  const [coverLetter, setCoverLetter] = useState("");
  const [submitError, setSubmitError] = useState("");
  const { mutate, isPending, reset,isError:isApplyError,error:applyError } = useApplyToInternship();

  const { data, isLoading, isError, error, isFetching } = useGetApplyProfile(open);

  const { fullName, email } = useMemo(() => extractUser(data?.user), [data?.user]);
  const skills = useMemo(() => extractSkills(data?.skills), [data?.skills]);
  const resumeUrl = useMemo(() => extractResumeUrl(data?.resume), [data?.resume]);

  function handleClose() {
    reset();
    setSubmitError("");
    onClose();
  }

  function handleCoverLetterChange(value: string) {
    setCoverLetter(value);
    setSubmitError("");
    reset();
  }

  function handleSubmit() {
    setSubmitError("");
    reset();

    if (!internshipId) {
      setSubmitError("Missing internship id. Please refresh the page and try again.");
      return;
    }

    mutate({
      internshipId,
      coverLetter,
      skills,
    }, {
      onSuccess: () => {
        toast({
          title: "Application submitted",
          description: "Your application was submitted successfully.",
        });
        handleClose();
        setCoverLetter("");
      },
      onError: (submitError) => {
        const message =
          submitError instanceof Error
            ? submitError.message
            : "Please try again.";

        setSubmitError(message);
        toast({
          title: "Failed to submit application",
          description: message,
          variant: "destructive",
        });
      },
    });
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl border border-[#0b1f33]/15 bg-white shadow-[0_30px_90px_rgba(16,24,40,0.22)]">
        {/* Header */}
        <div className="flex items-start gap-4 px-6 pb-5 pt-6 md:px-8">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl bg-[#f6f7fb]">
            <Image src={internship.image} alt={internship.title} fill className="object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-xl font-extrabold text-[#0b1f33] md:text-2xl">
              Confirm Application
            </div>
            <div className="mt-1 text-sm text-[#0b1f33]/60">
              Applying for{" "}
              <span className="font-semibold text-[var(--ds-primary)]">
                {internship.title}
              </span>{" "}
              at{" "}
              <span className="font-semibold text-[#0b1f33]/75">
                {internship.company}
              </span>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-[#0b1f33]/55 hover:bg-[#0b1f33]/5 hover:text-[#0b1f33]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="h-px w-full bg-[#0b1f33]/10" />

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 pt-6 md:px-8">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[#0b1f33]">Contact Information</h3>
            <Link href="/profile" className="text-sm font-semibold text-[var(--ds-primary)] hover:underline">
              Edit Profile
            </Link>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#0b1f33]">FullName</label>
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-[#0b1f33]/12 bg-white px-4 py-3 shadow-sm">
                <div className="flex min-w-0 items-center gap-3 text-sm text-[#0b1f33]/80">
                  <User className="h-4 w-4 text-[#0b1f33]/45" />
                  <span className="truncate">{isLoading ? "Loading..." : fullName}</span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-[#0a79c9]" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#0b1f33]">Email Address</label>
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-[#0b1f33]/12 bg-white px-4 py-3 shadow-sm">
                <div className="flex min-w-0 items-center gap-3 text-sm text-[#0b1f33]/80">
                  <Mail className="h-4 w-4 text-[#0b1f33]/45" />
                  <span className="truncate">{isLoading ? "Loading..." : email}</span>
                </div>
                <CheckCircle2 className="h-5 w-5 text-[#0a79c9]" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-[#0b1f33]">Current Skills</h3>
            <Link href="/profile" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ds-primary)] hover:underline">
              Update
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            {isFetching && (
              <span className="text-sm text-[#0b1f33]/55">Loading skills...</span>
            )}
            {!isFetching && skills.length === 0 ? (
              <span className="text-sm text-[#0b1f33]/55">No skills found.</span>
            ) : (
              skills.map((s) => (
                <span
                  key={s}
                  className="rounded-xl bg-[#1e78c8] px-5 py-2 text-sm font-semibold text-white shadow-sm"
                >
                  {s}
                </span>
              ))
            )}
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-bold text-[#0b1f33]">Resume / CV</h3>

            <div className="mt-4 rounded-2xl border border-[#0b1f33]/10 bg-white p-4 shadow-sm">
              {resumeUrl ? (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-[#eaf2ff] text-[#0a79c9]">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#0b1f33]">
                        {fullName} Resume.pdf
                      </div>
                      <div className="text-xs text-[#0b1f33]/55">
                        PDF • Resume file is ready to view
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="View resume"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/12 text-[#0b1f33]/60 hover:bg-[#0b1f33]/5"
                    >
                      <Eye className="h-5 w-5" />
                    </a>
                    <button
                      type="button"
                      aria-label="Remove resume"
                      disabled
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0b1f33]/12 text-[#0b1f33]/35"
                    >
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-[#0b1f33]/60">
                    No resume found. Upload one from your profile to apply.
                  </div>
                  <Link
                    href="/profile"
                    className="inline-flex items-center justify-center rounded-xl bg-[var(--ds-primary)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--ds-primary-dark)]"
                  >
                    Upload Resume
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-[#0b1f33]">Cover Letter</h3>
              <span className="rounded-md bg-[#0b1f33]/5 px-2 py-0.5 text-xs font-semibold text-[#0b1f33]/70">
                Optional
              </span>
            </div>

            <textarea
              value={coverLetter}
              onChange={(e) => handleCoverLetterChange(e.target.value)}
              placeholder="Briefly describe why you are a good fit for this role..."
              className="mt-4 min-h-[140px] w-full resize-none rounded-2xl border border-[#0b1f33]/12 bg-white px-4 py-3 text-sm text-[#0b1f33] shadow-sm outline-none placeholder:text-[#0b1f33]/35 focus:border-[#0a79c9]/40"
            />
          </div>

          {isError && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error instanceof Error ? error.message : "Failed to load your profile info."}
            </div>
          )}

          {submitError && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <p className="font-semibold">Application was not submitted.</p>
                <p className="mt-1">{submitError}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#0b1f33]/10 px-6 py-5 md:px-8">
          <button
            type="button"
            onClick={handleClose}
            disabled={isPending}
            className="rounded-md border border-[#0b1f33]/15 bg-white px-5 py-2.5 text-sm font-semibold text-[#0b1f33] hover:bg-[#0b1f33]/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-md bg-[var(--ds-primary)] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[var(--ds-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  );
}
