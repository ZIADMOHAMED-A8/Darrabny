"use client"

import Image from "next/image"
import Link from "next/link"
import { Bookmark, BookmarkCheck, Briefcase, Building2, Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { InternshipCardData } from "@/lib/types/internships/internships"

type Props = {
  data: InternshipCardData
  isSaving?: boolean
  onToggleSave?: (id: string, next: boolean) => void
}

export default function InternshipCard({ data, isSaving, onToggleSave }: Props) {
  const {
    id, company, title, mode, employmentType,
    duration, imageUrl, saved, match, reason, chips = []
  } = data

  const matchLabel = typeof match === "number"
    ? `${Math.max(0, Math.min(100, match))}% Match`
    : null

  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Diagonal match ribbon */}
      {matchLabel && (
        <div className="absolute right-0 top-0 z-10">
          <div className="origin-top-right rotate-45 translate-x-10 translate-y-4 bg-blue-600 px-10 py-1 text-[10px] font-bold text-white tracking-wide">
            {matchLabel}
          </div>
        </div>
      )}

      <div className="flex gap-3.5 p-3.5">
        {/* Thumbnail */}
        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} fill className="object-cover" />
          ) : (
            <Building2 className="m-auto h-8 w-8 text-slate-400" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-slate-500">{company}</p>
          <h3 className="text-base font-bold text-slate-900 leading-snug mt-0.5">
            {title}
          </h3>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />{mode}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-3 w-3" />{employmentType}
            </span>
            {duration && (
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3 w-3" />{duration}
              </span>
            )}
          </div>

          {/* Why this matches */}
          {(reason || chips.length > 0) && (
            <div className="mt-2.5 rounded-xl bg-blue-50/70 p-2.5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600 text-white flex-shrink-0">
                  <Building2 className="h-3 w-3" />
                </div>
                WHY THIS MATCHES YOU
              </div>
              {reason && (
                <p className="mt-1.5 text-[11px] text-slate-700 leading-relaxed">{reason}</p>
              )}
              {chips.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {chips.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-[10px] font-medium text-blue-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="mt-3 flex items-center justify-between">
            <Link
              href={`/student/internships/${id}`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-1.5 text-[13px] font-semibold text-white hover:bg-blue-700"
            >
              View Details
            </Link>

            <button
              type="button"
              disabled={isSaving}
              onClick={() => onToggleSave?.(id, !saved)}
              aria-label={saved ? "Unsave internship" : "Save internship"}
              aria-pressed={saved}
              className={cn(
                "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-colors",
                saved
                  ? "border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50",
                isSaving && "cursor-not-allowed opacity-60"
              )}
            >
              {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}