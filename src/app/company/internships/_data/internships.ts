export type CompanyInternshipStatus =
  | "all"
  | "active"
  | "closed"
  | "starting_soon";

export type InternshipCardData = {
  id: string;
  company: string;
  title: string;
  mode: "Remote" | "On-site" | "Hybrid";
  employmentType: "Full-time" | "Part-time";
  duration?: string;
  imageUrl: string;
  saved?: boolean;

  // company page extras
  status: CompanyInternshipStatus; // "active" | "closed" | "starting_soon"
};

export const COMPANY_INTERNSHIPS: InternshipCardData[] = [
  {
    id: "1",
    company: "Tech Innovators Inc.",
    title: "Software Engineering Intern",
    mode: "Remote",
    employmentType: "Full-time",
    duration: "3 months",
    imageUrl:
      "/images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80",
    saved: false,
    status: "active",
  },
  {
    id: "2",
    company: "Tech Innovators Inc.",
    title: "Marketing Intern",
    mode: "Hybrid",
    employmentType: "Part-time",
    duration: "6 months",
    imageUrl:
      "/images.unsplash.com/photo-1526481280695-3c687fd5432c?w=1200&q=80",
    saved: false,
    status: "starting_soon",
  },
  {
    id: "3",
    company: "Tech Innovators Inc.",
    title: "Data Analysis Intern",
    mode: "On-site",
    employmentType: "Full-time",
    duration: "3 months",
    imageUrl:
      "/images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    saved: false,
    status: "closed",
  },
  {
    id: "4",
    company: "Tech Innovators Inc.",
    title: "Financial Analyst Intern",
    mode: "Remote",
    employmentType: "Full-time",
    duration: "6 months",
    imageUrl:
      "/images.unsplash.com/photo-1621761191319-c6fb62004040?w=1200&q=80",
    saved: false,
    status: "active",
  },
  {
    id: "5",
    company: "Tech Innovators Inc.",
    title: "Research Intern",
    mode: "On-site",
    employmentType: "Part-time",
    duration: "12 months",
    imageUrl:
      "/images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80",
    saved: false,
    status: "active",
  },
  {
    id: "6",
    company: "Tech Innovators Inc.",
    title: "UI/UX Design Intern",
    mode: "Hybrid",
    employmentType: "Full-time",
    duration: "3 months",
    imageUrl:
      "/images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80",
    saved: false,
    status: "closed",
  },
];
