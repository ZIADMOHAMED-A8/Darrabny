"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { internshipSchema } from "@/lib/schemas/internship/internship.schema";
import { useAddInternship } from "../_hooks/use-add-internship";
import {
  InternshipPostFormProps,
  InternshipPostFormValues,
} from "@/lib/types/internships/internships";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateInternship } from "../_hooks/use-update-internship";
import { useToast } from "@/hooks/use-toast";

const DEFAULT_VALUES: InternshipPostFormValues = {
  internshipTitle: "Frontend Developer Intern",
  internshipDescription:
    "Internship focused on building modern web applications",
  internshipLocation: "remote",
  durationInMonths: "3",
  workingTime: "full-time",
  technicalSkills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  softSkills: ["Teamwork", "Problem-solving", "Communication"],
  startDate: "2026-04-01",
  closed: false,
  thumbnail: null,
};

type Props = InternshipPostFormProps & {
  onCancel?: () => void;
  mode?: "create" | "edit";
  internshipId?: string;
};
const inputLike =
  "h-12 rounded-xl border border-[#0B2A4A]/50 bg-white px-4 text-[#0B2A4A] placeholder:text-[#0B2A4A]/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#1E90FF]";

const textareaLike =
  "min-h-[92px] rounded-xl border border-[#0B2A4A]/50 bg-white px-4 py-3 text-[#0B2A4A] placeholder:text-[#0B2A4A]/50 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-[#1E90FF]";

const sectionTitle = "text-[20px] font-extrabold tracking-wide text-[#0B2A4A]";
const smallCaps = "text-[14px] font-semibold tracking-wide text-[#0B2A4A]";

function ChipsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = React.useState("");

  function addFromDraft() {
    const v = draft.trim();
    if (!v) return;
    if (value.some((x) => x.toLowerCase() === v.toLowerCase())) {
      setDraft("");
      return;
    }
    onChange([...value, v]);
    setDraft("");
  }

  function removeChip(chip: string) {
    onChange(value.filter((x) => x !== chip));
  }

  return (
    <div
      className={`min-h-12 ${inputLike} flex flex-wrap items-center gap-2 py-2`}
    >
      {value.map((chip) => (
        <span
          key={chip}
          className="inline-flex items-center gap-2 rounded-full bg-[#1f7ed6] px-3 py-1 text-xs font-semibold text-white"
        >
          {chip}
          <button
            type="button"
            onClick={() => removeChip(chip)}
            className="text-white/90 hover:text-white"
            aria-label={`remove ${chip}`}
          >
            ✕
          </button>
        </span>
      ))}

      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addFromDraft();
          }
        }}
        onBlur={addFromDraft}
        placeholder={placeholder}
        className="flex-1 min-w-[180px] bg-transparent outline-none text-[15px] placeholder:text-[#0B2A4A]/50"
      />
    </div>
  );
}

export default function InternshipPostForm({
  title = "New Internship Post",
  defaultValues,
  publishLabel = "Publish Post",
  onCancel,
  mode = "create",
  internshipId,
}: Props) {
  const form = useForm<InternshipPostFormValues>({
    resolver: zodResolver(internshipSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...defaultValues,
    },
  });

  const { addInternship, isPending } = useAddInternship();
  const {
    updateInternship,
    isPending: isUpdating,
  } = useUpdateInternship();
  const { toast } = useToast();
  function submit(values: InternshipPostFormValues) {
    const formData = new FormData();

    // =========================
    // Basic Fields
    // =========================
    formData.append("internshipTitle", values.internshipTitle);
    formData.append("internshipDescription", values.internshipDescription);
    formData.append("internshipLocation", values.internshipLocation);
    formData.append("workingTime", values.workingTime);
    formData.append("startDate", new Date(values.startDate).toISOString());

    formData.append(
      "durationInMonths",
      String(Number(values.durationInMonths)),
    );
    formData.append("closed", String(values.closed));

    // =========================
    values.technicalSkills.forEach((skill: string) => {
      formData.append("technicalSkills", skill);
    });

    values.softSkills.forEach((skill: string) => {
      formData.append("softSkills", skill);
    });

    // =========================
    // Thumbnail
    // =========================
    if (values.thumbnail instanceof File) {
      formData.append("thumbnail", values.thumbnail);
    }

    // =========================
    // Debugging
    // =========================
    console.log("========== FormData ==========");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    console.log("==============================");

    if (mode === "edit" && internshipId) {
      updateInternship(
        { id: internshipId, data: formData },
        {
          onSuccess: () => {
            toast({
              title: "Internship updated",
              description: "Your internship has been updated successfully.",
            });
            onCancel?.();
          },
          onError: (error) => {
            toast({
              title: "Update failed",
              description: error.message,
              variant: "destructive",
            });
          },
        },
      );
    } else {
      addInternship(formData, {
        onSuccess: () => {
          toast({
            title: "Internship posted",
            description: "Your internship has been posted successfully.",
          });
          form.reset({
            ...DEFAULT_VALUES,
          });
          onCancel?.();
        },
        onError: (error) => {
          toast({
            title: "Post failed",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    }
  }
  function saveDraft() {
    const values = form.getValues();
    submit({
      ...values,
      isActive: false,
    });
  }

  return (
    <Card className="w-full rounded-2xl border border-black/10 shadow-2xl bg-white backdrop-blur">
      <CardHeader className="pb-4">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </CardHeader>

      <Separator />

      <CardContent className="p-4 sm:p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
            {/* INTERNSHIP INFO */}
            <div className="space-y-4">
              <div className={sectionTitle}>INTERNSHIP INFO</div>

              {/* Internship Title */}
              <FormField
                control={form.control}
                name="internshipTitle"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Internship Title</Label>
                    <FormControl>
                      <Input
                        {...field}
                        className={inputLike}
                        placeholder="e.g. Junior React Developer"
                      />
                    </FormControl>
                    <FormMessage className="text-[#B00020]" />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="internshipDescription"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Description</Label>
                    <FormControl>
                      <Textarea
                        {...field}
                        className={textareaLike}
                        placeholder="Detail the internship responsibilities..."
                      />
                    </FormControl>
                    <FormMessage className="text-[#B00020]" />
                  </FormItem>
                )}
              />

              {/* Location Type + City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Location Type */}
                <FormField
                  control={form.control}
                  name="internshipLocation"
                  render={({ field }) => (
                    <FormItem>
                      <Label className={smallCaps}>Location Type</Label>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start gap-3"
                        >
                          {(["onsite", "remote", "hybrid"] as const).map(
                            (v) => (
                              <ToggleGroupItem
                                key={v}
                                value={v}
                                className="h-11 flex-1 rounded-xl border border-[#0B2A4A]/50 bg-white px-4 text-sm font-semibold text-[#0B2A4A] hover:bg-[#e6f0ff] data-[state=on]:bg-[#1E90FF] data-[state=on]:font-bold data-[state=on]:text-white sm:flex-none sm:px-6"
                              >
                                {v === "onsite"
                                  ? "Onsite"
                                  : v === "remote"
                                    ? "Remote"
                                    : "Hybrid"}
                              </ToggleGroupItem>
                            ),
                          )}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* City */}
                {/* <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <Label className={smallCaps}>City</Label>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={`${inputLike} justify-between`}
                          >
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((c) => (
                              <SelectItem key={c.value} value={c.value}>
                                {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              </div>

              {/* Duration + Working Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="durationInMonths"
                  render={({ field }) => (
                    <FormItem>
                      <Label className={smallCaps}>Duration</Label>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            className={inputLike}
                            placeholder="e.g. 6"
                          />
                          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#0B2A4A]/70">
                            Months
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="workingTime"
                  render={({ field }) => (
                    <FormItem>
                      <Label className={smallCaps}>Working Time</Label>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={field.value}
                          onValueChange={field.onChange}
                          className="flex flex-wrap justify-start gap-3 pt-2 sm:gap-6"
                        >
                          <ToggleGroupItem
                            value="full-time"
                            className="data-[state=on]:text-[#0B2A4A] data-[state=off]:text-[#0B2A4A]/70 text-sm font-semibold"
                          >
                            Full-Time
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="part-time"
                            className="data-[state=on]:text-[#0B2A4A] data-[state=off]:text-[#0B2A4A]/70 text-sm font-semibold"
                          >
                            Part-Time
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Seniority Level */}
              {/* <FormField
                control={form.control}
                name="seniorityLevel"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Seniority Level</Label>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className={inputLike}>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          {["Junior", "Mid", "Senior"].map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Status */}
              {/* <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Status</Label>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className={inputLike}>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {["onboarding", "active", "closed"].map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              {/* Closed */}
              {/* <FormField
                control={form.control}
                name="closed"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span className="text-sm font-semibold text-[#0B2A4A]">
                      {field.value ? "Closed" : "Open"}
                    </span>
                  </FormItem>
                )}
              /> */}

              {/* Thumbnail */}
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Thumbnail</Label>

                    <FormControl>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <label className="cursor-pointer rounded-xl border border-[#0B2A4A]/40 bg-white px-4 py-2 text-sm font-semibold text-[#0B2A4A] hover:bg-[#E3F0FA] transition">
                          Choose Image
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;

                              // ===== Debug Info =====
                              console.log("Selected file:", file);
                              console.log("File name:", file?.name);
                              console.log(
                                "Is File instance:",
                                file instanceof File,
                              );
                              console.log("Type of value:", typeof file);

                              field.onChange(file);
                            }}
                          />
                        </label>

                        <span className="text-sm text-[#0B2A4A]/70">
                          {field.value?.name || "No file selected"}
                        </span>
                      </div>
                    </FormControl>

                    <FormMessage />

                    {/* Optional: live debug of form state */}
                    <pre className="text-xs text-blue-500">
                      {field.value && typeof field.value === "object"
                        ? `File name: ${field.value.name}, type: ${field.value.type}, size: ${field.value.size} bytes`
                        : "No file selected"}
                    </pre>
                  </FormItem>
                )}
              />
            </div>

            {/* SKILLS */}
            <div className="space-y-4">
              <div className={sectionTitle}>SKILLS</div>

              {/* Technical Skills */}
              <FormField
                control={form.control}
                name="technicalSkills"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Technical Skills</Label>
                    <FormControl>
                      <ChipsInput
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Add technical skill..."
                      />
                    </FormControl>
                    <p className="text-xs text-[#1E90FF]">
                      Detail the internship responsibilities, learning outcomes,
                      and expectations...
                    </p>
                    <FormMessage className="text-[#B00020]" />
                  </FormItem>
                )}
              />

              {/* Soft Skills */}
              <FormField
                control={form.control}
                name="softSkills"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Soft Skills</Label>
                    <FormControl>
                      <ChipsInput
                        value={field.value || []}
                        onChange={field.onChange}
                        placeholder="Add soft skill..."
                      />
                    </FormControl>
                    <FormMessage className="text-[#B00020]" />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-2" />

            {/* POST STATUS + DATE/TIME */}
            {/* <div className="space-y-4">
              <div className={sectionTitle}>POST STATUS & DATE/TIME</div>

              <div className="rounded-xl border border-[#0B2A4A]/50 bg-[#E3F0FA] p-4 flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-[#0B2A4A]">
                    Post Status
                  </div>
                  <div className="text-xs text-[#0B2A4A]/70">
                    Toggle to open or close applications immediately
                  </div>
                </div>

            <FormField
  control={form.control}
  name="isActive"
  render={({ field }) => (
    <FormItem className="flex items-center gap-3">
      <Switch
        checked={field.value}
        onCheckedChange={field.onChange}
        className={`relative inline-flex h-6 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-gray-300 transition-colors duration-200 ease-in-out
          ${field.value ? "bg-[#1E90FF]" : "bg-white"}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out
            ${field.value ? "translate-x-8 bg-white" : "translate-x-0 bg-[#1E90FF]"}`}
        />
      </Switch>
      <span className="text-sm font-semibold text-[#0B2A4A]">
        {field.value ? "Active" : "Inactive"}
      </span>
      <FormMessage className="text-[#B00020]" />
    </FormItem>
  )}
/>
              </div>

*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date */}
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <Label className={smallCaps}>Date</Label>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          className={inputLike}
                          placeholder="mm/dd/yyyy"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0B2A4A]/55">
                          📅
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage className="text-[#B00020]" />
                  </FormItem>
                )}
              />
            </div>
            {/* </div> */}


            <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-[#0B2A4A]/50 text-[#0B2A4A]"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border-[#0B2A4A]/50 text-[#0B2A4A]"
                  onClick={saveDraft}
                  disabled={isPending}
                >
                  Save as Draft
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-[#1E90FF] hover:bg-[#187bcd]"
                  disabled={isPending || isUpdating}
                >
                  {isUpdating
                    ? "Updating..."
                    : isPending
                      ? "Publishing..."
                      : mode === "edit"
                        ? "Update Internship"
                        : publishLabel}
                </Button>
              </div>
            </div>
          </form>
          <pre className="text-red-500 text-xs">
            {JSON.stringify(form.formState.errors, null, 2)}
          </pre>
        </Form>
      </CardContent>
    </Card>
  );
}
