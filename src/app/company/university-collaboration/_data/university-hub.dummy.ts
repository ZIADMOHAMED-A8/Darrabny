export type HubRow = {
  id: string
  internName: string
  internCode: string
  avatarText: string
  avatarColor: "pink" | "indigo"
  university: string
  faculty: string
  program: string
  programWeek: string
  performanceLabel: "Good" | "Pending Report"
  performanceValue: number
  statusLabel: "Active" | "Review Needed"
}

export const universityHubDummy = {
  title: "University Collaboration & Training Hub",
  subtitle: "Monitor training programs, university reports, and associated students",
  rows: [
    {
      id: "1",
      internName: "Jane Doe",
      internCode: "#INT-2024-042",
      avatarText: "JD",
      avatarColor: "pink",
      university: "State Tech Uni",
      faculty: "Computer Science Dept",
      program: "Frontend Dev Track",
      programWeek: "(Wk 8)",
      performanceLabel: "Good",
      performanceValue: 78,
      statusLabel: "Active",
    },
    {
      id: "2",
      internName: "Alex Smith",
      internCode: "#INT-2024-055",
      avatarText: "AS",
      avatarColor: "indigo",
      university: "City College",
      faculty: "Business Admin Faculty",
      program: "Marketing Assistant",
      programWeek: "(Wk 2)",
      performanceLabel: "Pending Report",
      performanceValue: 22,
      statusLabel: "Review Needed",
    },
  ] as HubRow[],

  cards: [
    {
      key: "reports",
      title: "REPORTS",
      big: "2 Pending",
      small: "Due within 7 days",
    },
    {
      key: "training",
      title: "TRAINING",
      big: "3 Active Programs",
      small: "Software, Marketing, Data",
    },
    {
      key: "partners",
      title: "PARTNERS",
      big: "4 Universities",
      small: "Connected Faculties",
    },
  ],
}
