import z from "zod";

export const FormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3)
      .max(80),

    description: z
      .string()
      .trim()
      .min(20)
      .max(1200),

    locationType: z.enum(["onsite", "remote", "hybrid"]),

    city: z.string().min(1),

    durationMonths: z
      .string()
      .trim()
      .refine(
        (v) => {
          if (!v) return true;
          if (!/^\d+$/.test(v)) return false;
          const n = Number(v);
          return n >= 1 && n <= 24;
        },
        { message: "Duration must be a number between 1 and 24" }
      ),

    workingTime: z.enum(["full-time", "part-time"]),

    technicalSkills: z
      .array(z.string().trim().min(1))
      .min(1),

    softSkills: z
      .array(z.string().trim().min(1))
      .default([]),

    isActive: z.boolean(),

    date: z.string().default(""),
    time: z.string().default(""),
  })
