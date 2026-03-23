import { z } from "zod";

export const internshipSchema = z.object({
  internshipTittle: z.string().trim().min(3, "Title is too short").max(80, "Title is too long"),

  internshipLocation: z.string().trim().min(1, "Location is required"),

  workingTime: z.enum(["full-time", "part-time"]),

  internshipDescription: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1200, "Description is too long"),

  technicalSkills: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least one technical skill"),

  softSkills: z.array(z.string().trim().min(1)).default([]),

  seniorityLevel: z.enum(["Junior", "Mid-Level", "Senior"]),

  status: z.enum(["onboarding", "draft"]),

  startDate: z.string().min(1, "Start date is required"),

  durationInMonths: z.coerce
    .number()
    .min(1, "Duration must be at least 1 month"),

  closed: z.boolean(),
  thumbnail: z.instanceof(File).optional().nullable(),
});

export type InternshipSchema = z.infer<typeof internshipSchema>;