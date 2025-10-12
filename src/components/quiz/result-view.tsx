"use client";

import { RefreshCcw, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ResultsDonut from "./result-donut";
// import ResultsDonut from "./ResultsDonut";

type Answer = {
  key: string;
  answer: string;
};

type ApiQuestion = {
  _id: string;
  question: string;
  answers: Answer[];
  correct?: string;
};

type ResultsViewProps = {
  examTitle: string;
  trackTitle: string;
  questions: ApiQuestion[];
  picked: Record<string, string>;
  correctCount: number;
  incorrectCount: number;
  onBack: () => void;
  onRestart: () => void;
  onExplore?: () => void;
};

export default function ResultsView({
  examTitle,
  trackTitle,
  questions,
  picked,
  correctCount,
  incorrectCount,
  onRestart,
  onExplore,
}: ResultsViewProps) {
  return (
    <div className="mx-auto p-6 bg-white">
      

      {/* Sub header */}
      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2 mb-4">
        <div>
          {trackTitle} - {examTitle}
        </div>
        <div>
          Question {questions.length} of {questions.length}
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-6">
        {/* Left side - chart & stats */}
        <div className="flex flex-col items-center gap-3">
          <ResultsDonut correct={correctCount} incorrect={incorrectCount} />
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: "#10b981" }}
              />
              <span className="text-foreground">Correct:</span>
              <span className="font-semibold text-foreground">
                {correctCount}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: "#ef4444" }}
              />
              <span className="text-foreground">Incorrect:</span>
              <span className="font-semibold text-foreground">
                {incorrectCount}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - answers review */}
        <Card className="shadow-sm">
          <CardContent className="px-6 py-4">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Results:
            </h3>

            <div className="space-y-5 max-h-[520px] overflow-auto pr-2">
              {questions.map((qq) => {
                const selected = picked[qq._id];
                const correctKey = qq.correct!;

                return (
                  <div
                    key={qq._id}
                    className="border rounded-md p-3 bg-muted/30"
                  >
                    <div className="text-blue-700 font-semibold mb-2">
                      {qq.question}
                    </div>
                    <div className="space-y-2">
                      {qq.answers.map((ans) => {
                        const isCorrect = ans.key === correctKey;
                        const isSelected = ans.key === selected;

                        let cls =
                          "flex items-center gap-2 rounded border px-3 py-2 text-sm";
                        if (isSelected && isCorrect)
                          cls += " bg-emerald-100 border-emerald-300";
                        else if (isSelected && !isCorrect)
                          cls += " bg-red-100 border-red-300";
                        else if (!isSelected && isCorrect)
                          cls += " bg-emerald-50 border-emerald-200";
                        else cls += " bg-white border-border";

                        return (
                          <div key={ans.key} className={cls}>
                            <span
                              className={`inline-flex items-center justify-center w-4 h-4 rounded-full border ${
                                isSelected
                                  ? isCorrect
                                    ? "bg-emerald-600 border-emerald-600"
                                    : "bg-red-600 border-red-600"
                                  : "border-gray-300"
                              }`}
                            />
                            <span className="text-foreground">
                              {ans.answer}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6">
              <Button
                variant="secondary"
                onClick={onRestart}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300"
              >
                <RefreshCcw className="w-4 h-4" /> Restart
              </Button>
              <Button
                onClick={() =>
                  onExplore
                    ? onExplore()
                    : window.scrollTo({ top: 0, behavior: "smooth" })
                }
                className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <FolderOpen className="w-4 h-4" /> Explore
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
