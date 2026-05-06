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
};

export default function StudentsTable({ initialData }: StudentsTableProps) {
  const [students] = React.useState(initialData);
  const [selectedPlacement, setSelectedPlacement] =
    React.useState<StudentPlacement | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [performanceScore, setPerformanceScore] = React.useState("");
  const [attendance, setAttendance] = React.useState("");
  const [feedback, setFeedback] = React.useState("");

  const { addReport, isPending } = useAddReport();
  const { toast } = useToast();

  const openAddReportModal = (placement: StudentPlacement) => {
    setSelectedPlacement(placement);
    setPerformanceScore("");
    setAttendance("");
    setFeedback("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlacement(null);
  };

  const onSubmitReport = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedPlacement) {
      return;
    }

    addReport(
      {
        performanceScore: Number(performanceScore),
        attendance: Number(attendance),
        feedback,
        placementId: selectedPlacement.placementId,
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
          toast({
            title: "Failed to submit report",
            description: String(error?.message || "Please try again."),
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

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-sm">
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
                  >
                    Add Report
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={isModalOpen} onClose={closeModal}>
        <form onSubmit={onSubmitReport} className="space-y-4 text-white">
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

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">Stats</h4>
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-blue-100">
                  Performance Score (0-100)
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={performanceScore}
                  onChange={(event) => setPerformanceScore(event.target.value)}
                  className="border-white/20 bg-white/5 text-white"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-blue-100">
                  Attendance (0-100)
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={attendance}
                  onChange={(event) => setAttendance(event.target.value)}
                  className="border-white/20 bg-white/5 text-white"
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">
              Feedback
            </h4>
            <Textarea
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Write detailed feedback for the intern..."
              className="min-h-[120px] border-white/20 bg-white/5 text-white placeholder:text-blue-200/70"
              required
            />
          </div>

          <div className="rounded-lg border border-white/15 p-3">
            <h4 className="mb-3 text-sm font-semibold text-blue-100">
              Actions
            </h4>
            <div className="flex justify-end gap-2">
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
