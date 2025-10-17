"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export type InternshipCardProps = {
  title: string
  description: string
  imageSrc: string
  href?: string
  company?: string
}

export default function InternshipCard({
  title,
  description,
  imageSrc,
  href = "#",
  company,
}: InternshipCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden border-border bg-card rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <div className="relative w-full h-48">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>
        <CardContent className="p-5">
          {company && (
            <p className="text-xs text-muted-foreground mb-1">{company}</p>
          )}
          <h3 className="text-base font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}
