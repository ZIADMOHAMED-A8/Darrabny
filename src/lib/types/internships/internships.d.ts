export type InternshipMode = "Remote" | "On-site" | "Hybrid"
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship"

export interface InternshipCardData {
  id: string
  company: string
  title: string
  mode: InternshipMode
  employmentType: EmploymentType
  duration?: string
  imageUrl: string
  href: string
  saved?: boolean
}

export type InternshipPostFormValues = z.infer<typeof internshipSchema>;

export type InternshipPostFormProps = {
  title?: string;
  defaultValues?: Partial<InternshipPostFormValues>;
  cities?: { value: string; label: string }[];

  publishLabel?: string;
  draftLabel?: string;
};