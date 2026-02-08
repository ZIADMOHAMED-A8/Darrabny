// app/company/report/_data/report.dummy.ts

export const reportDummy = {
  title: "July 2025 Internship Report",
  status: "Under Review",
  meta: "Submitted by John Doe (ID #4920) | June 1 - June 30,2025",

  intern: {
    name: "John Doe",
    role: "Software Engineering Intern",
    university: "Stanford University Class of 2024",
    major: "Computer Science",
  },

  placement: {
    supervisor: { initials: "SM", name: "Sarah Miller" },
    startDate: "May 15,2025",
    endDate: "Aug 15,2025",
    progress: { fromLabel: "Week 7", toLabel: "Week 12", pct: 58 },
  },

  attachments: [
    { name: "Project_Summary_July", size: "2.4 MB", age: "2d ago" },
    { name: "Hours_Log_July.xlsx", size: "152KB", age: "2d ago" },
    { name: "Dashbord_Screenshots.png", size: "16 MB", age: "2d ago" },
  ],

  stats: [
    { label: "Tasks Completed", value: "12 /15", chip: "+2 from last month", chipTone: "green" as const },
    { label: "Attendance", value: "95%", chip: "2 days sick leave", chipTone: "gray" as const },
    { label: "Performance Score", value: "4.2/5.0", chip: "Top 10% of interns", chipTone: "blue" as const },
  ],

  reflection: {
    updated: "Last updated 2 days ago",
    items: [
      {
        title: "Key Achievements",
        body:
          "This month, I successfully completed the migration of the legacy user authentication module to the new OAuth2 provider. This involved refactoring over 15 components and writing comprehensive unit tests. I also assisted the UI/UX team in implementing the new design system for the dashboard, ensuring pixel-perfect implementation from Figma designs.",
      },
      {
        title: "Challenges Faced",
        body:
          "One of the main challenges was dealing with backward compatibility issues in the database schema. I had to write a complex migration script that took longer than expected to debug. However, with guidance from my supervisor, Sarah, I learned how to use transaction rollbacks effectively during testing.",
      },
      {
        title: "Learning Outcomes",
        body:
          "I deepened my understanding of React Hooks, specifically useContext and useReducer for global state management. I also gained practical experience with Docker for containerizing the development environment, which has streamlined my local setup process significantly.",
      },
    ],
  },

  skills: [
    { label: "Technical Skill", pct: 85 },
    { label: "Communication", pct: 90 },
    { label: "Problem Solving", pct: 75 },
    { label: "Initiative", pct: 95 },
  ],

  feedback: {
    thread: [
      {
        id: "m1",
        side: "left" as const,
        initials: "SM",
        name: "Sarah Miller",
        role: "Supervisor",
        time: "Yesterday at 2:30 PM",
        body:
          'Great work on the authentication module, Alex. I’ve reviewed your code and it looks solid. Can you please expand a bit more on the "Challenges Faced" section regarding the database migration? Specifically, what was the blocker?',
      },
      {
        id: "m2",
        side: "right" as const,
        initials: "JD",
        name: "John Doe",
        role: "Intern",
        time: "Today at 9:15 AM",
        body:
          "Sure Sarah! The main issue was a data type mismatch in the legacy user_id column which caused the foreign key constraint to fail. I’ll update the report with more details.",
      },
    ],
  },
};
