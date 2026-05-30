"use client"

import { InternshipCardData } from "@/lib/types/internships/internships"
import InternshipCard from "./internship-card"

type Props = {
  items: InternshipCardData[]
  onToggleSave?: (id: string, next: boolean) => void
}

export default function InternshipList({ items, onToggleSave }: Props) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {items.map((item) => (
        <InternshipCard key={item.id} data={item} onToggleSave={onToggleSave} />
      ))}
    </section>
  )
}