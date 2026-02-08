export type AiCandidate = {
  id: string;
  initials: string;
  name: string;
  email: string;
  university: string;
  skills: string[];
  moreSkillsCount?: number;
  score: number; // 0..100

  // ✅ NEW (optional) for the right-side actions list bubble label
  aiLabel?: "very good" | "excellent" | "bad" | "very bad" | "acceptable";

  preview: {
    name: string;
    headline: string;
    matchScore: number;
    strengths: string[];
    reviewNotes: string[];
    recentExperience: { title: string; org: string; year: string }[];
  };
};

export const aiRankedDummy = {
  title: "AI-Ranked Applicants",
  subtitle:
    "Ranked by algorithm based on 15 core technical competencies and cultural fit metrics",
  candidates: [
    {
      id: "c1",
      initials: "JD",
      name: "Jane Doe",
      email: "Jane@Darrabny.com",
      university: "Stanford University",
      skills: ["Python", "React"],
      moreSkillsCount: 2,
      score: 89,
      aiLabel: "very good", // ✅
      preview: {
        name: "Jane Doe",
        headline: "Software Engineering Intern",
        matchScore: 89,
        strengths: [
          "Strong React fundamentals and component architecture.",
          "Solid Python scripting and data handling skills.",
          "Good collaboration & communication signals.",
        ],
        reviewNotes: ["Needs stronger system design depth for backend-heavy roles."],
        recentExperience: [
          { title: "Frontend Intern", org: "FinTech Solutions", year: "2024" },
          { title: "Volunteer Developer", org: "Campus Tech Club", year: "2023" },
        ],
      },
    },
    {
      id: "c2",
      initials: "AE",
      name: "Ahmed Ezz",
      email: "ezz@Darrabny.com",
      university: "Alexandria University",
      skills: ["JS", "React"],
      moreSkillsCount: 5,
      score: 98,
      aiLabel: "excellent", // ✅
      preview: {
        name: "Ahmed Ezz",
        headline: "Software Engineering Intern",
        matchScore: 98,
        strengths: [
          "Exceeds baseline Python requirements with 4 years of documented project work.",
          "Strong overlap with current tech stack (React, SQL, AWS).",
          "Previous internship at High-Growth Fintech startup.",
        ],
        reviewNotes: ["Limited experience with specialized internal tooling (Bazel)."],
        recentExperience: [
          { title: "Full-Stack Intern", org: "FinTech Solutions", year: "2024" },
          { title: "Open Source Contributor", org: "Apache Spark", year: "2023" },
        ],
      },
    },
    {
      id: "c3",
      initials: "SN",
      name: "Sara Nour",
      email: "sara@Darrabny.com",
      university: "Cairo University",
      skills: ["C++", "Java"],
      moreSkillsCount: 0,
      score: 35,
      aiLabel: "bad", // ✅
      preview: {
        name: "Sara Nour",
        headline: "Software Engineering Intern",
        matchScore: 35,
        strengths: ["Good CS fundamentals and OOP discipline."],
        reviewNotes: ["Weak match to frontend track; needs React + SQL exposure."],
        recentExperience: [
          { title: "Teaching Assistant", org: "CS Dept", year: "2024" },
          { title: "Problem Solver", org: "Competitive Programming", year: "2023" },
        ],
      },
    },
    {
      id: "c4",
      initials: "AD",
      name: "Adam Doe",
      email: "doe@Darrabny.com",
      university: "MIT",
      skills: ["Python", "React"],
      moreSkillsCount: 9,
      score: 99,
      aiLabel: "excellent", // ✅
      preview: {
        name: "Adam Doe",
        headline: "Software Engineering Intern",
        matchScore: 99,
        strengths: ["Excellent match across stack + culture fit signals."],
        reviewNotes: ["None."],
        recentExperience: [
          { title: "Software Intern", org: "Lab Projects", year: "2024" },
          { title: "Research Assistant", org: "AI Group", year: "2023" },
        ],
      },
    },
    {
      id: "c5",
      initials: "MI",
      name: "Mai Islam",
      email: "mai@Darrabny.com",
      university: "Alexandria University",
      skills: ["Python", "CSS"],
      moreSkillsCount: 2,
      score: 15,
      aiLabel: "very bad", // ✅
      preview: {
        name: "Mai Islam",
        headline: "Software Engineering Intern",
        matchScore: 15,
        strengths: ["Good UI polish and steady delivery pace."],
        reviewNotes: ["Needs stronger backend/API patterns."],
        recentExperience: [
          { title: "UI Intern", org: "Startup Studio", year: "2024" },
          { title: "Freelancer", org: "Web Projects", year: "2023" },
        ],
      },
    },
    {
      id: "c6",
      initials: "JA",
      name: "Jane Adam",
      email: "adam@Darrabny.com",
      university: "Stanford University",
      skills: ["Ruby", "React"],
      moreSkillsCount: 5,
      score: 62,
      aiLabel: "acceptable", // ✅
      preview: {
        name: "Jane Adam",
        headline: "Software Engineering Intern",
        matchScore: 62,
        strengths: ["Strong full-stack mindset; quick learner."],
        reviewNotes: ["Improve testing discipline for production code."],
        recentExperience: [
          { title: "Web Intern", org: "Product Team", year: "2024" },
          { title: "Hackathon Winner", org: "Uni League", year: "2023" },
        ],
      },
    },
  ] as AiCandidate[],
};
