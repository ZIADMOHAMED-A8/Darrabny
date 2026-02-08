export type InternshipMode = "Remote" | "On-site" | "Hybrid"
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship"

export interface InternshipCardData {
  id: string
  company: string
  title: string
  mode: InternshipMode
  employmentType: EmploymentType
  duration?: string // e.g. "3 months"
  imageUrl: string
  href: string
  saved?: boolean
}
