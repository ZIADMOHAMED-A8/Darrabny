export type InternshipMode = "Remote" | "On-site" | "Hybrid"
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship"

export type InternshipCardData = {
  id: string;
  internshipTittle: string;
  internshipLocation: string;
  workingTime: string;
  durationInMonths?: number;
  thumbnail: string;
  companyId: {
    _id: string;
    companyName: string;
    id: string;
  };
  href: string;
};

export type InternshipPostFormValues = z.infer<typeof internshipSchema>;

export type InternshipPostFormProps = {
  title?: string;
  defaultValues?: Partial<InternshipPostFormValues>;
  cities?: { value: string; label: string }[];
  publishLabel?: string;
  draftLabel?: string;
};