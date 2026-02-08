"use client"

import Image from "next/image"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { cn } from "@/lib/utils"
import { InternshipCardData } from "@/lib/types/internships/internships"

type Props = {
  data: InternshipCardData
  onToggleSave?: (id: string, next: boolean) => void
}

export default function InternshipCard({
  data,
  onToggleSave,
}: Props) {
  const { id, company, title, mode, employmentType, duration, imageUrl, saved } = data

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm",
        "hover:shadow-md transition-shadow",
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
        {/* left image */}
        <div className="relative h-56 md:h-64 md:rounded-l-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={`${title} - ${company}`}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
            priority={false}
          />
        </div>

        {/* right content */}
        <div className="p-5 md:p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">{company}</p>
              <h3 className="mt-1 text-2xl font-bold text-foreground leading-snug">
                {title}
              </h3>
            </div>

            {/* save button */}
            <button
              type="button"
              aria-label={saved ? "Remove bookmark" : "Save internship"}
              onClick={() => onToggleSave?.(id, !saved)}
              className={cn(
                "shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border",
                "bg-card hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              )}
            >
              {saved ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            </button>
          </div>

          {/* meta row */}
          <div className="text-muted-foreground">
            <span>{mode}</span>
            <span className="mx-2">•</span>
            <span>{employmentType}</span>
            {duration && (
              <>
                <span className="mx-2">•</span>
                <span>{duration}</span>
              </>
            )}
          </div>

        </div>
      </div>
    </article>
  )
}
