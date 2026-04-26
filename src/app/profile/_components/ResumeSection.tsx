"use client";

import { ChangeEvent, useMemo, useRef } from "react";
import { FileText, Loader2, Upload } from "lucide-react";
import useGetResume from "../_hooks/useGetResume";
import useUploadResume from "../_hooks/useUploadResume";
import { useToast } from "@/hooks/use-toast";
import useGetUser from "../../(student)/hooks/useGetLoginUser";

interface ResumeSectionProps {
  isEditing?: boolean;
}

type ResumeUI = {
  url: string;
};

const extractResume = (payload: unknown): ResumeUI | null => {
  if (!payload) return null;
    return {
      url: payload.downloadUrl,
    };
};

export default function ResumeSection({ isEditing }: ResumeSectionProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const { data, isLoading, isError, error: getResumeError } = useGetResume();
  const { data: userData } = useGetUser();
  const { uploadResume, isPending: isUploading, error: uploadError } = useUploadResume();

  const resume = useMemo(() => extractResume(data), [data]);
  const user = userData?.data ?? userData?.user ?? userData;
  const fullNameFromParts = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const userName = user?.name || user?.fullName || fullNameFromParts || "Student";
  const resumeDisplayName = `${userName} resume`;

  const handlePickFile = () => {
    if (isUploading) return;


    inputRef.current?.click();
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.currentTarget.value = "";

    if (!file) return;

    const localUrl = URL.createObjectURL(file);

    try {
      await uploadResume({ file, localUrl });
      toast({
        title: "Resume uploaded",
        description: "Your resume was uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload resume.",
        variant: "destructive",
      });
      URL.revokeObjectURL(localUrl);
    }
  };

  return (
    <section className="rounded-2xl border border-[#cdd9f2] bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-8">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-[#111f37]">Resume</h2>

        {isEditing && (
          <button
            type="button"
            onClick={handlePickFile}
            disabled={isUploading}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1176c8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0b67b0] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
            Upload Resume
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleUpload}
      />

      {isLoading ? (
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading resume...
        </div>
      ) : true ? (
        <div className="flex flex-col gap-4 rounded-xl bg-[#eef1ff] p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dff0ff] text-[#1878c8]">
              <FileText className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xl font-semibold text-[#111f37]">{resumeDisplayName}</p>
              <p className="text-base text-slate-500">Resume file is ready to download.</p>
            </div>
          </div>

          {resume ? (
            <a
            download
              href={resume.url}
              target="_blank"
              rel="noreferrer"
              className="w-full rounded-lg bg-[#1176c8] px-6 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#0b67b0] sm:w-auto"
            >
              Download
            </a>
          ) : (
            <span className="text-sm text-slate-500">Download unavailable</span>
          )}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No resume found.</p>
      )}

      {isError && (
        <p className="mt-3 text-sm text-red-600">
          {getResumeError instanceof Error ? getResumeError.message : "Failed to load resume."}
        </p>
      )}

      {uploadError && (
        <p className="mt-2 text-sm text-red-600">{uploadError.message || "Failed to upload resume."}</p>
      )}
    </section>
  );
}
