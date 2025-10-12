"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import TimerCircle from "@/components/quiz/time-circle";
import ResultsView from "@/components/quiz/result-view";

/* ================= Types ================= */
export type ApiAnswer = { answer: string; key: string };
export type ApiQuestion = {
  _id: string;
  question: string;
  answers: ApiAnswer[];
  correct?: string;
};
export type SubmitPayload = {
  picked: Record<string, string>;
  score?: number;
  total?: number;
};

/* ================= Helpers (Hydration-safe) ================= */
function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

/* ================= Main component ================= */
export default function QuestionsRunner({
  examTitle,
  trackTitle,
  questions,
  durationSeconds = 60,
  onSubmit,
  onExplore,
}: {
  examTitle: string;
  trackTitle: string;
  questions: ApiQuestion[];
  durationSeconds?: number;
  onSubmit?: (data: SubmitPayload) => void;
  onExplore?: () => void;
}) {
  const hydrated = useHydrated();

  if (!questions?.length) {
    return (
      <div className="max-w-2xl mx-auto my-12 text-center text-sm text-muted-foreground">
        No questions available for this exam.
      </div>
    );
  }

  // مفتاح ثابت للامتحان
  const examKey = useMemo(
    () => `qr:${trackTitle}:${examTitle}`.replace(/\s+/g, "_"),
    [examTitle, trackTitle]
  );

  const total = questions.length;

  // ======== State ========
  const [index, setIndex] = useState<number>(0);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const [deadline, setDeadline] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  const didLoadFromStorage = useRef(false);
  const submittedOnExpire = useRef(false);

  // Load once after mount (index, picked, deadline)
  useEffect(() => {
    if (!hydrated || didLoadFromStorage.current) return;

    try {
      const rawIdx = localStorage.getItem(`${examKey}:index`);
      const rawPicked = localStorage.getItem(`${examKey}:picked`);
      const rawDeadline = localStorage.getItem(`${examKey}:deadline`);

      const idx = rawIdx ? Number(JSON.parse(rawIdx)) : 0;
      const pkd = rawPicked
        ? (JSON.parse(rawPicked) as Record<string, string>)
        : {};
      const clamped = Number.isFinite(idx)
        ? Math.min(Math.max(idx, 0), total - 1)
        : 0;

      setIndex(clamped);
      setPicked(pkd || {});

      let dl: number | null = null;
      if (rawDeadline) {
        const parsed = Number(JSON.parse(rawDeadline));
        dl = Number.isFinite(parsed) ? parsed : null;
      }
      if (!dl) {
        dl = Date.now() + durationSeconds * 1000;
        localStorage.setItem(`${examKey}:deadline`, JSON.stringify(dl));
      }
      setDeadline(dl);
      setIsExpired(dl <= Date.now());
    } catch {
      const dl = Date.now() + durationSeconds * 1000;
      setDeadline(dl);
      setIsExpired(false);
      localStorage.setItem(`${examKey}:deadline`, JSON.stringify(dl));
    } finally {
      didLoadFromStorage.current = true;
    }
  }, [hydrated, examKey, total, durationSeconds]);

  useEffect(() => {
    if (!hydrated || !didLoadFromStorage.current) return;
    try {
      localStorage.setItem(`${examKey}:index`, JSON.stringify(index));
      localStorage.setItem(`${examKey}:picked`, JSON.stringify(picked));
      if (deadline)
        localStorage.setItem(`${examKey}:deadline`, JSON.stringify(deadline));
    } catch {}
  }, [hydrated, examKey, index, picked, deadline]);

  useEffect(() => {
    if (!hydrated || !deadline) return;
    if (deadline - Date.now() <= 0 && !submittedOnExpire.current) {
      setIsExpired(true);
      submittedOnExpire.current = true;
      const hasCorrect = questions.every(
        (qq) => typeof qq.correct === "string" && qq.correct
      );
      let c = 0;
      if (hasCorrect) {
        for (const qq of questions) {
          const sel = (picked ?? {})[qq._id];
          if (sel && sel === qq.correct) c++;
        }
      }
      const payload: SubmitPayload = {
        picked,
        score: hasCorrect ? c : undefined,
        total: hasCorrect ? total : undefined,
      };
      onSubmit?.(payload);
      setShowResults(true);
    }
  }, [hydrated, deadline, picked, questions, total, onSubmit]);

  const safeIndex = Math.min(Math.max(index, 0), total - 1);
  const q = questions[safeIndex];
  const overallProgress =
    hydrated && total ? ((safeIndex + 1) / total) * 100 : 0;

  const canPrev = hydrated && safeIndex > 0;
  const canNext = hydrated && safeIndex < total - 1;

  const select = useCallback(
    (key: string) => {
      if (!hydrated || isExpired) return;
      setPicked((prev) => ({ ...(prev || {}), [q._id]: key }));
    },
    [hydrated, isExpired, q?._id]
  );

  const prev = useCallback(() => {
    if (!hydrated) return;
    setIndex((n) => Math.max(0, n - 1));
  }, [hydrated]);

  const next = useCallback(() => {
    if (!hydrated) return;
    setIndex((n) => Math.min(total - 1, n + 1));
  }, [hydrated, total]);

  const hasCorrect = useMemo(
    () => questions.every((qq) => typeof qq.correct === "string" && qq.correct),
    [questions]
  );

  const { correctCount, incorrectCount } = useMemo(() => {
    if (!hasCorrect) return { correctCount: 0, incorrectCount: 0 };
    let c = 0,
      w = 0;
    for (const qq of questions) {
      const sel = (picked ?? {})[qq._id];
      if (sel && sel === qq.correct) c++;
      else w++;
    }
    return { correctCount: c, incorrectCount: w };
  }, [picked, questions, hasCorrect]);

  const submit = useCallback(() => setShowResults(true), []);
  const restart = useCallback(() => {
    if (!hydrated) return;
    setIndex(0);
    setPicked({});
    setIsExpired(false);
    const dl = Date.now() + durationSeconds * 1000;
    setDeadline(dl);
    localStorage.setItem(`${examKey}:deadline`, JSON.stringify(dl));
    setShowResults(false);
    submittedOnExpire.current = false;
  }, [hydrated, durationSeconds, examKey]);

  const handleSubmit = () => {
    if (!hydrated) return;
    const payload: SubmitPayload = {
      picked,
      score: hasCorrect ? correctCount : undefined,
      total: hasCorrect ? total : undefined,
    };
    onSubmit?.(payload);
    submit();
  };

  if (!hydrated) {
    return <div className="px-6 mx-auto" />;
  }

  if (showResults) {
    return (
      <ResultsView
        examTitle={examTitle}
        trackTitle={trackTitle}
        questions={questions}
        picked={picked}
        correctCount={correctCount}
        incorrectCount={incorrectCount}
        onBack={() => setShowResults(false)}
        onRestart={restart}
        onExplore={onExplore}
      />
    );
  }

  console.log(trackTitle);
  console.log(safeIndex);
  
  /* === شرط عرض الصورة === */
//   const questionMedia: Record<
//   number,
//   { src: string; caption: string }
// > = {
//   5: {
//     src: "/next_question.gif",
//     caption: "يلا عالسؤال اللي بعده 👉",
//   },
//   6: {
//     src: "/jerry_jerry.gif",
//     caption: "راحت عالسؤال اللي بعده برده... مبتتعلمش 😂",
//   },
// };

// const media = questionMedia[safeIndex];

  return (
    <div className="mx-auto">
      <div className="mb-3">
        <Progress value={overallProgress} />
        <div className="mt-1 text-xs text-muted-foreground text-right">
          {safeIndex + 1} / {total}
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground border-b pb-2 mb-3">
        <div>{trackTitle}</div>
        <div>
          Question <span className="font-medium">{safeIndex + 1}</span> of{" "}
          <span className="font-medium">{total}</span>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="px-6 py-5">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            {q.question}
          </h2>

          {/* الصورة الخاصة بالـ UX/UI سؤال 3 */}
        {/* {media && (
  <div className="mb-4 text-center">
    <Image
      src={media.src}
      alt="helper"
      width={300}
      height={300}
      className="mx-auto rounded-md shadow-sm"
      priority
      unoptimized
    />
    <p className="mt-2 text-sm text-gray-700">{media.caption}</p>
  </div>
)} */}

          <RadioGroup
            value={picked[q._id] ?? ""}
            onValueChange={select}
            disabled={isExpired}
            className="space-y-3"
          >
            {q.answers.map((a) => {
              const id = `${q._id}-${a.key}`;
              const checked = picked[q._id] === a.key;
              return (
                <div
                  key={a.key}
                  className={`flex items-center gap-3 rounded px-3 py-3 ${
                    checked ? "bg-blue-50" : "bg-gray-50"
                  } ${isExpired ? "opacity-60" : ""}`}
                >
                  <RadioGroupItem id={id} value={a.key} />
                  <Label
                    htmlFor={id}
                    className="text-sm text-foreground cursor-pointer"
                  >
                    {a.answer}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>

          <div className="flex items-center gap-3 mt-8">
            <Button
              variant="secondary"
              onClick={prev}
              disabled={!canPrev || isExpired}
              className="flex-1 bg-gray-200 hover:bg-gray-300"
            >
              <span className="inline-flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> Previous
              </span>
            </Button>

            <TimerCircle
              deadline={deadline}
              durationSeconds={durationSeconds}
              onComplete={() => {
                if (!submittedOnExpire.current) {
                  setIsExpired(true);
                  submittedOnExpire.current = true;
                  const payload: SubmitPayload = {
                    picked,
                    score: hasCorrect ? correctCount : undefined,
                    total: hasCorrect ? total : undefined,
                  };
                  onSubmit?.(payload);
                  setShowResults(true);
                }
              }}
            />

            {safeIndex === total - 1 ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700"
                    disabled={isExpired}
                  >
                    Finish / Submit
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to submit?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Submit
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ) : (
              <Button
                onClick={next}
                disabled={!canNext || isExpired}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-70"
              >
                <span className="inline-flex items-center gap-1">
                  Next <ChevronRight className="w-4 h-4" />
                </span>
              </Button>
            )}
          </div>

          {isExpired && (
            <p className="mt-3 text-sm text-red-600">
              Time is up! The exam has ended. Please review your answers and
              submit.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
