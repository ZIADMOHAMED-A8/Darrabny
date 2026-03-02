export type ApplicationStatus =
  | "applied"
  | "under-review"
  | "accepted"
  | "rejected";

export type ApplicationTab =
  | "all"
  | "active"
  | "closed"
  | "under-review";

export const applications = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Innovate Inc.",
    steps: [
      { label: "Applied", date: "Jan 15, 2024", status: "applied" },
      { label: "Under Review", date: "Jan 20, 2024", status: "under-review" },
      { label: "Accepted", date: "Feb 1, 2024", status: "accepted" },
    ],
  },
  {
    id: 2,
    title: "Product Design Intern",
    company: "Creative Solutions",
    steps: [
      { label: "Applied", date: "Feb 10, 2024", status: "applied" },
      {
        label: "Under Review",
        date: "Since Feb 15, 2024",
        status: "under-review",
      },
      { label: "Decision", date: "", status: "pending" },
    ],
  },
  {
    id: 3,
    title: "Data Analyst Intern",
    company: "DataCorp",
    steps: [
      { label: "Applied", date: "Dec 1, 2023", status: "applied" },
      { label: "Under Review", date: "Dec 10, 2023", status: "under-review" },
      { label: "Rejected", date: "Dec 20, 2023", status: "rejected" },
    ],
  },
  {
    id: 4,
    title: "Marketing Intern",
    company: "GrowthGenius",
    steps: [
      { label: "Applied", date: "Nov 15, 2023", status: "applied" },
      { label: "Under Review", date: "Nov 20, 2023", status: "under-review" },
      { label: "Accepted", date: "Dec 1, 2023", status: "accepted" },
    ],
  },
];
