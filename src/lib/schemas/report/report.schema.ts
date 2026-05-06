import { z } from "zod";

const objectIdRegex = /^[a-f\d]{24}$/i;

export const reportSchema = z.object({
  performanceScore: z.coerce
    .number("performanceScore is required")
    .min(0, "performanceScore must be between 0 and 100")
    .max(100, "performanceScore must be between 0 and 100"),
  attendance: z.coerce
    .number("attendance is required")
    .min(0, "attendance must be between 0 and 100")
    .max(100, "attendance must be between 0 and 100"),
  feedback: z
    .string("feedback is required")
    .trim()
    .min(10, "feedback must be at least 10 characters"),
  placementId: z
    .string("placementId is required")
    .trim()
    .regex(objectIdRegex, "placementId must be a valid ObjectId"),
});

export type ReportValues = z.infer<typeof reportSchema>;
