export type InternshipStatus = "in-progress" | "completed";

export const StudentInternships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Tech Solutions Inc",
    mode: "Remote",
    progress: 65,
    week: "Week 8 of 12",
    status: "in-progress" as InternshipStatus,
  },
  {
    id: 2,
    title: "Software Engineering Intern",
    company: "Tech Solutions Inc",
    mode: "Remote",
    progress: 90,
    week: "Week 8 of 12",
    status: "in-progress" as InternshipStatus,
  },
  {
    id: 3,
    title: "Marketing Intern",
    company: "Creative Solutions Agency",
    mode: "Hybrid",
    progress: 100,
    week: "Week 24 of 24",
    status: "completed" as InternshipStatus,
  },
  {
    id: 4,
    title: "UI/UX Design Intern",
    company: "Future Tech Solutions",
    mode: "Remote",
    progress: 100,
    week: "Week 12 of 12",
    status: "completed" as InternshipStatus,
  },
];
