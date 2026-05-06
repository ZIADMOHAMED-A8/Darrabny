export type InternshipSummary = {
  id: string;
  title: string;
  activeStudents: number;
  pendingReports: number;
};

export type StudentPlacement = {
  placementId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  currentPerformance: number;
};
