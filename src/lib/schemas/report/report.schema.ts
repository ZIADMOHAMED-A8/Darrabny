import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const selfAssessmentSchema = z.object({
  technicalSkill: z.coerce.number().min(1).max(5),
  problemSolving: z.coerce.number().min(1).max(5),
  communication: z.coerce.number().min(1).max(5),
  initiative: z.coerce.number().min(1).max(5),
});

export const reportSchema = z.object({
  studentId: z
    .string("studentId is required")
    .trim()
    .regex(objectIdRegex, "studentId must be a valid ObjectId"),
  periodStart: z.string("periodStart is required").trim().min(1),
  periodEnd: z.string("periodEnd is required").trim().min(1),
  title: z.string("title is required").trim().min(1, "Title is required"),
  keyAchievements: z.string().trim().min(1, "Key achievements is required"),
  challengesFaced: z.string().trim().min(1, "Challenges faced is required"),
  learningOutcomes: z.string().trim().min(1, "Learning outcomes is required"),
  internalNote: z.string().trim().optional(),
  tasksCompleted: z.string().trim().min(1, "Tasks completed is required"),
  attendanceNotes: z.string().trim().optional(),
  selfAssessment: selfAssessmentSchema,
});

export type ReportValues = z.infer<typeof reportSchema>;
