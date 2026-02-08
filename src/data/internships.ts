import { InternshipCardData } from "@/lib/types/internships/internships";

export const items: InternshipCardData[] = [
  {
    id: "1",
    company: "Tech Innovators Inc.",
    title: "Software Engineering Intern",
    mode: "Remote",
    employmentType: "Full-time",
    duration: "3 months",
    imageUrl: "/images/cards/office-1.jpg",
    href: "/internships/software-engineering-intern",
    saved: false,
  },
  {
    id: "2",
    company: "Data Insights Corp.",
    title: "Data Analysis Intern",
    mode: "On-site",
    employmentType: "Full-time",
    duration: "6 months",
    imageUrl: "/images/cards/office-2.jpg",
    href: "/internships/data-analysis-intern",
    saved: true,
  },
]