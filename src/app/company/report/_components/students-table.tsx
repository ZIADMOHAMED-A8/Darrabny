"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Modal from "@/components/ui/Modal";
import { useToast } from "@/hooks/use-toast";
import { useAddReport } from "../hooks/use-add-report";
import type { StudentPlacement } from "../_types/report";
import PerformanceBar from "./performance-bar";

type StudentsTableProps = {
  initialData: StudentPlacement[];
  internshipId: string;
};

export default function StudentsTable({ initialData, internshipId }: StudentsTableProps) {
  const [students] = React.useState(initialData);
  const [selectedPlacement, setSelectedPlacement] =
    React.useState<StudentPlacement | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const [title, setTitle] = React.useState("");
  const [periodStart, setPeriodStart] = React.useState("");
  const [periodEnd, setPeriodEnd] = React.useState("");
  const [keyAchievements, setKeyAchievements] = React.useState("");
  const [challengesFaced, setChallengesFaced] = React.useState("");
  const [learningOutcomes, setLearningOutcomes] = React.useState("");
  const [internalNote, setInternalNote] = React.useState("");
  const [tasksCompleted, setTasksCompleted] = React.useState("");
  const [attendanceNotes, setAttendanceNotes] = React.useState("");
  const [technicalSkill, setTechnicalSkill] = React.useState("");
  const [problemSolving, setProblemSolving] = React.useState("");
  const [communication, setCommunication] = React.useState("");
  const [initiative, setInitiative] = React.useState("");
  const [submitError, setSubmitError] = React.useState("");

  const { addReport, isPending, error, reset } = useAddReport();
  const { toast } = useToast();

  const errorMessage = submitError || error?.message || "";

  const openAddReportModal = (placement: StudentPlacement) => {
    reset();
    setSubmitError("");
    setSelectedPlacement(placement);
    setTitle("");
    setPeriodStart("");
    setPeriodEnd("");
    setKeyAchievements("");
    setChallengesFaced("");
    setLearningOutcomes("");
    setInternalNote("");
    setTasksCompleted("");
    setAttendanceNotes("");
    setTechnicalSkill("");
    setProblemSolving("");
    setCommunication("");
    setInitiative("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    reset();
    setSubmitError("");
    setIsModalOpen(false);
    setSelectedPlacement(null);
  };

  const onSubmitReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlacement) {
      return;
    }

    reset();
    setSubmitError("");

    if (!selectedPlacement.studentId) {
      setSubmitError("Student ID is missing for this placement.");
      return;
    }

    const fileInput = event.currentTarget.elements.namedItem("certificate");
    const certificateFile =
      fileInput instanceof HTMLInputElement ? fileInput.files?.[0] : null;

    addReport(
      {
        internshipId,
        certificateFile,
        data: {
          studentId: selectedPlacement.studentId,
          periodStart,
          periodEnd,
          title,
          keyAchievements,
          challengesFaced,
          learningOutcomes,
          internalNote,
          tasksCompleted,
          attendanceNotes,
          selfAssessment: {
            technicalSkill: Number(technicalSkill),
            problemSolving: Number(problemSolving),
            communication: Number(communication),
            initiative: Number(initiative),
          },
        },
      },
      {
        onSuccess: () => {
          toast({
            title: "Report submitted",
            description: `Evaluation for ${selectedPlacement.studentName} was saved.`,
          });
          closeModal();
        },
        onError: (error) => {
          const message = error?.message || "Please try again.";
          setSubmitError(message);
          toast({
            title: "Failed to submit report",
            description: message,
            variant: "destructive",
          });
        },
      },
    );
  };

  if (!students.length) {
    return (
      <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
        No students found for this internship yet.
      </p>
    );
  }

  const labelClass = "mb-1 block text-xs text-blue-100";
  const inputClass = "border-white/20 bg-white/5 text-white";

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-[720px] w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-left text-slate-500">
              <th className="py-3">Student</th>
              <th className="py-3">Email</th>
              <th className="py-3">Performance</th>
              <th className="py-3 ">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((placement) => (
              
              <tr
                key={placement.placementId}
                className="border-b border-slate-100"
              >
                <td className="py-3 font-medium text-slate-900">
                  {placement.studentName}
                </td>
                <td className="py-3 text-slate-600">
                  {placement.studentEmail}
                </td>
                <td className="py-3">
                  <PerformanceBar value={placement.currentPerformance} />
                </td>
                <td className="py-3 ">
                  <Button
                    type="button"
                    size="sm"
                    variant="default"
                    onClick={() => openAddReportModal(placement)}
                    className="whitespace-nowrap bg-blue-500"
                    disabled={placement.reportLabel==='Has Report'}
                  >
                    Add Report
                  </Button>
                  {console.log(placement)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <form onSubmit={onSubmitReport} className="space-y-4 text-white">
          {selectedPlacement ? (
            <input
              type="hidden"
              name="studentId"
              value={selectedPlacement.studentId}
            />
          ) : null}

          <div>
            <p className="text-xs uppercase tracking-wider text-blue-200">
              Create Evaluation
            </p>
            <h3 className="mt-1 text-xl font-bold">Add Report</h3>
            {selectedPlacement ? (
              <p className="mt-1 text-sm text-blue-100">
                {selectedPlacement.studentName} -{" "}
                {selectedPlacement.studentEmail}
              </p>
            ) : null}
          </div>

          {errorMessage ? (
            <div
              role="alert"
              className="rounded-md border border-red-300/40 bg-red-500/15 px-3 py-2 text-sm text-red-50"
            >
              {errorMessage}
            </div>
          ) : null}

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">Report Details</h4>
            <div className="grid gap-3">
              <div>
                <label className={labelClass}>Title</label>
                <Input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="e.g. Final Internship Report"
                  required
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Period Start</label>
                  <Input
                    name="periodStart"
                    type="date"
                    value={periodStart}
                    onChange={(e) => setPeriodStart(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Period End</label>
                  <Input
                    name="periodEnd"
                    type="date"
                    value={periodEnd}
                    onChange={(e) => setPeriodEnd(e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">Evaluation</h4>
            <div className="grid gap-3">
              <div>
                <label className={labelClass}>Key Achievements</label>
                <Textarea
                  name="keyAchievements"
                  value={keyAchievements}
                  onChange={(e) => setKeyAchievements(e.target.value)}
                  className={`min-h-[80px] ${inputClass}`}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Challenges Faced</label>
                <Textarea
                  name="challengesFaced"
                  value={challengesFaced}
                  onChange={(e) => setChallengesFaced(e.target.value)}
                  className={`min-h-[80px] ${inputClass}`}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Learning Outcomes</label>
                <Textarea
                  name="learningOutcomes"
                  value={learningOutcomes}
                  onChange={(e) => setLearningOutcomes(e.target.value)}
                  className={`min-h-[80px] ${inputClass}`}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Tasks Completed</label>
                <Textarea
                  name="tasksCompleted"
                  value={tasksCompleted}
                  onChange={(e) => setTasksCompleted(e.target.value)}
                  className={`min-h-[80px] ${inputClass}`}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Attendance Notes</label>
                <Input
                  name="attendanceNotes"
                  value={attendanceNotes}
                  onChange={(e) => setAttendanceNotes(e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Internal Note</label>
                <Textarea
                  name="internalNote"
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  className={`min-h-[60px] ${inputClass}`}
                />
              </div>
              <div>
                <label className={labelClass}>Certificate</label>
                <Input
                  name="certificate"
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">
              Self Assessment (1-5)
            </h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className={labelClass}>Technical Skill</label>
                <Input
                  name="selfAssessment[technicalSkill]"
                  type="number"
                  min={1}
                  max={5}
                  value={technicalSkill}
                  onChange={(e) => setTechnicalSkill(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Problem Solving</label>
                <Input
                  name="selfAssessment[problemSolving]"
                  type="number"
                  min={1}
                  max={5}
                  value={problemSolving}
                  onChange={(e) => setProblemSolving(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Communication</label>
                <Input
                  name="selfAssessment[communication]"
                  type="number"
                  min={1}
                  max={5}
                  value={communication}
                  onChange={(e) => setCommunication(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Initiative</label>
                <Input
                  name="selfAssessment[initiative]"
                  type="number"
                  min={1}
                  max={5}
                  value={initiative}
                  onChange={(e) => setInitiative(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">
              Actions
            </h4>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button className="bg-red-500" type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
