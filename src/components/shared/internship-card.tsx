"use client";

import Image from "next/image";
import Link from "next/link";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { InternshipCardData } from "@/lib/types/internships/internships";

type Props = {
  data: InternshipCardData;
  href?: string;
  onToggleSave?: (id: string, next: boolean) => void;
};

export default function InternshipCard({
  data,
  href = "#",
  onToggleSave,
}: Props) {
  const {
    id,
    company,
    title,
    mode,
    employmentType,
    duration,
    imageUrl,
    saved,
  } = data;

  return (
    <Link
      href={href}
      className="group block"
      aria-label={`Open internship ${title}`}
    >
      <article
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "border border-border bg-card shadow-sm",
          "transition-shadow hover:shadow-md"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr]">
          {/* Left image */}
          <div className="relative h-56 overflow-hidden md:h-64 md:rounded-l-2xl">
            <Image
              src={imageUrl}
              alt={`${title} - ${company}`}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>

          {/* Right content */}
          <div className="flex flex-col gap-4 p-5 md:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                {company && (
                  <p className="text-sm font-semibold text-primary">
                    {company}
                  </p>
                )}
                <h3 className="mt-1 text-2xl font-bold leading-snug text-foreground">
                  {title}
                </h3>
              </div>

              {/* Save button */}
              <button
                type="button"
                aria-label={saved ? "Remove bookmark" : "Save internship"}
                onClick={(e) => {
                  e.preventDefault(); // يمنع فتح اللينك
                  e.stopPropagation();
                  onToggleSave?.(id, !saved);
                }}
                className={cn(
                  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                  "border border-border bg-card",
                  "text-muted-foreground transition-colors",
                  "hover:bg-primary/10 hover:text-primary"
                )}
              >
                {saved ? (
                  <BookmarkCheck className="h-5 w-5" />
                ) : (
                  <Bookmark className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Meta row */}
            <div className="text-sm text-muted-foreground">
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
    </Link>
  );
}
