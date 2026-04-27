import { z } from "zod";

export const settingsSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "اسم الشركة مطلوب ويجب أن يكون على الأقل حرفين"),
  email: z.string().trim().email("البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .trim()
    .min(8, "رقم الهاتف قصير جدًا")
    .max(15, "رقم الهاتف طويل جدًا")
    .regex(/^[+]?\d[\d\s-]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
  address: z.string().trim().min(3, "العنوان مطلوب"),
});

export type SettingsValues = z.infer<typeof settingsSchema>;
