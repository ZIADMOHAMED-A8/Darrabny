"use client";

import { useMemo, useRef, useState } from "react";

import {
  FileText,
  Upload,
  RotateCcw,
  Trash2,
  ShieldCheck,
  Clock3,
  Landmark,
  ScrollText,
  CloudUpload,
  CheckCircle2,
  Info,
} from "lucide-react";

import { useCompanyVerification } from "./hooks/use-company-verification";
import { useUploadVerificationDocument } from "./hooks/use-upload-verification-document";
import UseDeleteDoc from "./hooks/use-delete-document";

type VerificationDocument = {
  _id: string;
  documentName: string;
  fileUrl: string;
  uploadDate: string;
  status: string;
};

type VerificationHistoryItem = {
  action: string;
  date: string;
  note: string;
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function statusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]";

    case "rejected":
      return "bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]";

    default:
      return "bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]";
  }
}

function docIcon(name: string) {
  if (name?.toLowerCase().includes("license")) {
    return (
      <FileText size={18} className="text-[#0B66C3]" />
    );
  }

  if (
    name?.toLowerCase().includes("university") ||
    name?.toLowerCase().includes("partnership")
  ) {
    return (
      <Landmark size={18} className="text-[#0B66C3]" />
    );
  }

  if (
    name?.toLowerCase().includes("registration")
  ) {
    return (
      <ScrollText size={18} className="text-[#0B66C3]" />
    );
  }

  return (
    <FileText size={18} className="text-[#0B66C3]" />
  );
}

function historyDotColor(index: number) {
  if (index === 0) return "bg-[#22C55E]";

  if (index === 1) return "bg-[#1E3A5F]";

  return "bg-[#94A3B8]";
}

export default function VerificationPage() {
  const { data, isLoading } =
    useCompanyVerification();
    const {mutate:deleteDoc}=UseDeleteDoc()
  const {
    mutate: uploadDocument,
    isPending: isUploading,
  } = useUploadVerificationDocument();

  const [dragging, setDragging] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const documents = useMemo<VerificationDocument[]>(
    () => data?.documents || [],
    [data?.documents]
  );
  const history = useMemo<VerificationHistoryItem[]>(
    () => data?.history || [],
    [data?.history]
  );

  const totalDocs = useMemo(
    () => documents.length,
    [documents]
  );

  const daysUntil = useMemo(() => {
    if (!data?.validUntil) return null;

    const diff =
      new Date(data.validUntil).getTime() -
      Date.now();

    return Math.ceil(
      diff / (1000 * 60 * 60 * 24)
    );
  }, [data?.validUntil]);

  function handleFile(file: File) {
    setSelectedFile(file);
  }

  function handleUpload() {
    if (!selectedFile) return;

    const formData = new FormData();

    formData.append("document", selectedFile);

    formData.append(
      "documentName",
      selectedFile.name
    );

    uploadDocument(formData, {
      onSuccess: () => {
        setSelectedFile(null);
      },
    });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-slate-500">
        Loading verification details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3F4F6] ">
      <main className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 md:py-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1A2E] sm:text-3xl">
            Manage Verification Credentials
          </h1>

          <p className="text-slate-500 mt-1.5 text-sm">
            Keep your company credentials up to
            date to maintain partnership status.
          </p>
        </div>

        {/* GRID */}
        <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* LEFT */}
          <div className="space-y-5">
            {/* STATUS */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 flex items-center gap-2 border-b border-slate-100">
                <Info
                  size={16}
                  className="text-slate-500"
                />

                <h2 className="font-semibold text-[#0F1A2E] text-base">
                  Current Status
                </h2>
              </div>

              <div className="px-6 py-5">
                <div
                  className={`flex flex-col gap-4 rounded-xl px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 ${
                    data?.status === "approved"
                      ? "bg-[#F0FDF4] border border-[#BBF7D0]"
                      : data?.status === "rejected"
                      ? "bg-[#FEF2F2] border border-[#FECACA]"
                      : "bg-[#FFFBEB] border border-[#FDE68A]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        data?.status ===
                        "approved"
                          ? "bg-[#22C55E]"
                          : data?.status ===
                            "rejected"
                          ? "bg-[#EF4444]"
                          : "bg-[#F59E0B]"
                      }`}
                    >
                      {data?.status ===
                      "approved" ? (
                        <CheckCircle2
                          size={20}
                          className="text-white"
                        />
                      ) : (
                        <ShieldCheck
                          size={20}
                          className="text-white"
                        />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="font-bold text-[#0F1A2E] text-sm">
                        {data?.status ===
                        "approved"
                          ? "University Verified"
                          : data?.status ===
                            "rejected"
                          ? "Verification Rejected"
                          : "Pending Verification"}
                      </p>

                      <p className="text-xs text-slate-500 mt-0.5">
                        {data?.status ===
                        "approved"
                          ? "Your account is fully verified for university partnerships."
                          : data?.status ===
                            "rejected"
                          ? "Your verification request was rejected."
                          : "Your verification request is under review."}
                      </p>
                    </div>
                  </div>

                  {data?.validUntil && (
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="text-sm font-semibold text-[#0F1A2E]">
                        Valid until{" "}
                        {formatDate(
                          data.validUntil
                        )}
                      </p>

                      {daysUntil !==
                        null && (
                        <p className="text-xs text-[#0B66C3] mt-0.5 font-medium">
                          Renew in{" "}
                          {daysUntil} days
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* DOCUMENTS */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText
                    size={16}
                    className="text-slate-500"
                  />

                  <h2 className="font-semibold text-[#0F1A2E] text-base">
                    Uploaded Documents
                  </h2>
                </div>

                <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-medium text-slate-600">
                  {totalDocs} Total
                </span>
              </div>

              {/* TABLE HEADER */}
              <div className="hidden grid-cols-[2fr_1fr_1fr_100px] border-b border-slate-100 bg-slate-50/60 px-6 py-3 text-[10px] uppercase tracking-widest text-slate-400 md:grid">
                <p>Document Name</p>

                <p>Upload Date</p>

                <p>Status</p>

                <p>Actions</p>
              </div>

              {/* DOCUMENTS */}
              <div>
                {documents.map((doc) => (
                  <div
                    key={doc._id}
                    className="grid gap-3 border-b border-slate-100 px-4 py-4 transition last:border-none hover:bg-slate-50/50 md:grid-cols-[2fr_1fr_1fr_100px] md:items-center md:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0">
                        {docIcon(
                          doc.documentName
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="break-words text-sm font-medium leading-snug text-[#0F1A2E]">
                          {doc.documentName}
                        </p>

                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          className="text-xs text-[#0B66C3] hover:underline"
                        >
                          View Document
                        </a>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500">
                      <span className="font-semibold text-slate-400 md:hidden">Uploaded: </span>
                      {formatDate(
                        doc.uploadDate
                      )}
                    </p>

                    <div>
                      <span className="mr-2 font-semibold text-slate-400 md:hidden">Status:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColor(
                          doc.status
                        )}`}
                      >
                        {doc.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#0B66C3] hover:border-[#0B66C3] transition">
                        <RotateCcw size={14} />
                      </button>

                      <button onClick={()=>{
                        deleteDoc(doc._id)
                      }} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-300 transition">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UPLOAD */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-5 flex items-center gap-2 border-b border-slate-100">
                <Upload
                  size={16}
                  className="text-slate-500"
                />

                <h2 className="font-semibold text-[#0F1A2E] text-base">
                  Upload New Document
                </h2>
              </div>

              <div className="px-6 py-6">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0];

                    if (file) {
                      handleFile(file);
                    }
                  }}
                />

                <div
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  onDragEnter={() =>
                    setDragging(true)
                  }
                  onDragLeave={() =>
                    setDragging(false)
                  }
                  onDragOver={(e) =>
                    e.preventDefault()
                  }
                  onDrop={(e) => {
                    e.preventDefault();

                    setDragging(false);

                    const file =
                      e.dataTransfer.files?.[0];

                    if (file) {
                      handleFile(file);
                    }
                  }}
                  className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 px-4 transition-all sm:min-h-[240px] sm:px-6 ${
                    dragging
                      ? "border-[#0B66C3] bg-[#EAF4FF]"
                      : "border-slate-300 hover:border-[#0B66C3]/50 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
                    <CloudUpload
                      size={26}
                      className="text-[#0B66C3]"
                    />
                  </div>

                  <h3 className="font-bold text-[#0F1A2E] mt-4 text-base text-center">
                    Drag & drop or click to upload
                  </h3>

                  <p className="text-slate-400 mt-1.5 text-sm text-center">
                    Supported formats: PDF, PNG,
                    JPG (Max 5MB)
                  </p>

                  {selectedFile && (
                    <div className="mt-6 flex w-full max-w-[420px] items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 sm:px-4">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] flex items-center justify-center shrink-0">
                          <FileText
                            size={18}
                            className="text-[#0B66C3]"
                          />
                        </div>

                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-[#0F1A2E] truncate">
                            {selectedFile.name}
                          </p>

                          <p className="text-xs text-slate-400">
                            {(
                              selectedFile.size /
                              1024 /
                              1024
                            ).toFixed(2)}{" "}
                            MB
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          setSelectedFile(
                            null
                          );
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}

                  {selectedFile && (
                    <button
                      disabled={isUploading}
                      onClick={(e) => {
                        e.stopPropagation();

                        handleUpload();
                      }}
                      className="mt-6 bg-[#0B66C3] hover:bg-[#0958A8] disabled:opacity-60 text-white px-8 py-3 rounded-xl font-medium transition"
                    >
                      {isUploading
                        ? "Uploading..."
                        : "Upload Document"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:sticky lg:top-[76px]">
            <div className="px-6 py-5 flex items-center gap-2 border-b border-slate-100">
              <Clock3
                size={16}
                className="text-slate-500"
              />

              <h2 className="font-semibold text-[#0F1A2E] text-base">
                Verification History
              </h2>
            </div>

            <div className="px-6 py-6">
              <div className="relative pl-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-slate-200 rounded-full" />

                <div className="space-y-8">
                  {history.map(
                    (
                      item: VerificationHistoryItem,
                      index: number
                    ) => (
                      <div
                        key={index}
                        className="relative"
                      >
                        <div
                          className={`absolute -left-[19px] top-1.5 w-[10px] h-[10px] rounded-full ring-2 ring-white ${historyDotColor(
                            index
                          )}`}
                        />

                        <h3 className="font-semibold text-[#0F1A2E] text-sm leading-snug capitalize">
                          {item.action.replaceAll(
                            "_",
                            " "
                          )}
                        </h3>

                        <p className="text-xs text-slate-400 mt-0.5">
                          {formatDate(
                            item.date
                          )}
                        </p>

                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                          {item.note}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* TIP */}
            <div className="mx-6 mb-6 rounded-xl bg-[#F8FAFC] border border-slate-200 p-4 flex gap-3 items-start">
              <div className="w-9 h-9 rounded-full bg-[#EAF4FF] flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck
                  size={16}
                  className="text-[#0B66C3]"
                />
              </div>

              <div>
                <h3 className="font-semibold text-[#0F1A2E] text-sm">
                  InternSpark Tip
                </h3>

                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Keep documents updated to stay
                  featured in university job boards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
