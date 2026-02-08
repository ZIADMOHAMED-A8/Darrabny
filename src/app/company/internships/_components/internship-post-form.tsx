"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { CalendarDays, ChevronDown, Clock, MapPin, X } from "lucide-react";

/* ----------------------------- types ----------------------------- */
export type InternshipPostFormValues = {
  title: string;
  description: string;

  locationType: "onsite" | "remote" | "hybrid";
  city: string;

  durationMonths: string;
  workingTime: "full-time" | "part-time";

  technicalSkills: string[];
  softSkills: string[];

  isActive: boolean;
  date: string;
  time: string;
};

export type InternshipPostFormProps = {
  title?: string;
  defaultValues?: Partial<InternshipPostFormValues>;
  cities?: { value: string; label: string }[];

  onCancel?: () => void;
  onSaveDraft?: (values: InternshipPostFormValues) => void;
  onPublish?: (values: InternshipPostFormValues) => void;

  publishLabel?: string;
  draftLabel?: string;
};

/* ----------------------------- dummy options ----------------------------- */
const DEFAULT_CITIES = [
  { value: "cairo", label: "Cairo" },
  { value: "alex", label: "Alexandria" },
  { value: "giza", label: "Giza" },
  { value: "mansoura", label: "Mansoura" },
];

const DEFAULT_VALUES: InternshipPostFormValues = {
  title: "",
  description: "",
  locationType: "onsite",
  city: "",
  durationMonths: "",
  workingTime: "full-time",
  technicalSkills: ["React", "TypeScript"],
  softSkills: [],
  isActive: true,
  date: "",
  time: "",
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/* ----------------------------- validation ----------------------------- */
const FormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(80),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(1200),

  locationType: z.enum(["onsite", "remote", "hybrid"]),
  city: z.string().min(1, "City is required"),

  durationMonths: z
    .string()
    .trim()
    .refine((v) => {
      if (!v) return true;
      if (!/^\d+$/.test(v)) return false;
      const n = Number(v);
      return n >= 1 && n <= 24;
    }, "Duration must be a number between 1 and 24"),

  workingTime: z.enum(["full-time", "part-time"]),

  technicalSkills: z
    .array(z.string().trim().min(1))
    .min(1, "Add at least 1 technical skill"),

  // ✅ make it required in the type (no default here)
  softSkills: z.array(z.string().trim().min(1)),

  isActive: z.boolean(),

  // ✅ required strings (no default here)
  date: z.string(),
  time: z.string(),
});

type FormSchemaType = z.infer<typeof FormSchema>;

/* ------------------------- Tag input (chips) ------------------------- */
function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [text, setText] = React.useState("");

  function addOne(raw: string) {
    const t = raw.trim();
    if (!t) return;
    if (value.some((x) => x.toLowerCase() === t.toLowerCase())) return;
    onChange([...value, t]);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addOne(text.replace(",", ""));
      setText("");
    }
    if (e.key === "Backspace" && !text && value.length) {
      onChange(value.slice(0, -1));
    }
  }

  return (
    <div className="flex min-h-[48px] w-full flex-wrap items-center gap-2 rounded-xl border border-[#0B2A4A]/30 bg-[#CFE0FF] px-3 py-2">
      {value.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-2 rounded-full bg-[#0B2A4A] px-3 py-1.5 text-sm text-white shadow-sm"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(value.filter((x) => x !== tag))}
            className="rounded-full p-0.5 hover:bg-white/15"
            aria-label={`Remove ${tag}`}
          >
            <X className="h-4 w-4" />
          </button>
        </span>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[180px] flex-1 bg-transparent text-sm text-slate-900 placeholder:text-slate-500 outline-none"
      />
    </div>
  );
}

/* ----------------------------- Main Form ----------------------------- */
export default function InternshipPostForm({
  title = "New Internship Post",
  defaultValues,
  cities = DEFAULT_CITIES,
  onCancel,
  onSaveDraft,
  onPublish,
  publishLabel = "Publish Post",
  draftLabel = "Save as Draft",
}: InternshipPostFormProps) {
  const mergedDefaults: InternshipPostFormValues = {
    ...DEFAULT_VALUES,
    ...defaultValues,
    technicalSkills:
      defaultValues?.technicalSkills ?? DEFAULT_VALUES.technicalSkills,
    softSkills: defaultValues?.softSkills ?? DEFAULT_VALUES.softSkills,
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: mergedDefaults,
    mode: "onSubmit",
  });

  const locationType = watch("locationType");
  const isActive = watch("isActive");
  const technicalSkills = watch("technicalSkills");
  const softSkills = watch("softSkills");

  function submitPublish(values: FormSchemaType) {
    onPublish?.(values as InternshipPostFormValues);
  }

  function submitDraft() {
    const raw = getValues();
    onSaveDraft?.(raw as InternshipPostFormValues);
  }

  return (
    <Card className="w-full max-w-[860px] rounded-2xl border border-black/10 bg-white shadow-2xl">
      <CardHeader className="pb-3">
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      </CardHeader>
      <Separator className="bg-black/10" />
      <CardContent className="p-8">
        {/* كل محتوى الفورم كما هو عندك بدون أي تغيير */}
      </CardContent>
    </Card>
  );
}
