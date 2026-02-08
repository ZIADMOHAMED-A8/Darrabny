// app/company/candidates/profile/_data/candidate-profile.dummy.ts

export const candidateProfileDummy = {
  breadcrumb: "Candidates / Engineering / John Doe",
  candidate: {
    name: "John Doe",
    role: "software Engineering Intern",
    university: "Stanford University",
    major: "Computer Science",
    gpa: "3.9/4",
    gradYear: "2025",
    avatarImage: "/avatar.png",
    skills: ["Python", "Java", "Git", "C++", "SQL"],
  },
  applicationStatus: {
    label: "IN REVIEW",
    steps: [
      { title: "Applied", done: true },
      { title: "Screening", done: true },
      { title: "Interview", done: false, active: true },
      { title: "Offer", done: false },
      { title: "Hired", done: false },
    ],
  },
  documents: {
    title: "Documents",
    file: {
      name: "Resume.pdf",
      meta: "2.4 MB | Uploaded 2d ago",
    },
  },
  progress: {
    title: "Internship Progress",
    donutLabel: "100%\nTASKS",
    rating: 5.0,
    ratingLabel: "Avg Rating",
  },
  evaluatorFeedback: {
    title: "Evaluator Feedback",
    lastUpdated: "Last updated: Today: 10:30 AM",
    noteTitle: "Technical Interview Notes",
    note:
      "Candidate demonstrated strong problem-solving skills during the coding challenge. Logic was sound, though optimization could be improved in the edge cases.",
    overallScore: 4,
  },
  actions: {
    title: "Actions",
    primary: "Accept Candidate",
    secondary: "Schedule Interview",
    danger: "Reject",
  },
  earnedBadges: {
    title: "Earned Badges",
    total: "0 Total",
  },
} as const;
