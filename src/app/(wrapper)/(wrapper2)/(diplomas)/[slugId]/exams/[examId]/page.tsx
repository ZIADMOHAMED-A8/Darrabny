// app/diplomas/[slugId]/exams/[examId]/page.tsx
import { getServerToken } from "@/lib/utils/get-token";
import { notFound } from "next/navigation";
import QuestionsRunner from "./components/QuestionRunner";
import HeaderBar from "@/components/header-bar";
import { HelpCircle } from "lucide-react";

type Params = { slugId: string; examId: string };


type Question = {
  _id: string;
  question: string;
  answers: { answer: string; key: string }[];
  type?: string;
  correct?: string;
  exam?: { _id?: string; title?: string; duration?: number };
  subject?: { _id?: string; name?: string; icon?: string };
};

type ApiResponse = { message?: string; questions?: Question[] };

export default async function ExamQuestionsPage({ params }: { params: Params }) {
  const { examId } = params;

  const token = await getServerToken();
  if (!token?.accessToken) return notFound();

  const res = await fetch(`https://exam-app-back-iota.vercel.app/questions?exam=${examId}`, {
    headers: { token: `${token.accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return notFound();

  const data = (await res.json()) as ApiResponse;
  // console.log("Questions data:", data);

  const questions: Question[] = Array.isArray(data?.questions) ? data.questions! : [];
  if (questions.length === 0) return notFound();
  console.log("Questions:", questions);
  
  const first = questions[0];
  const examTitle = first?.exam?.title ?? "Exam";
  const trackTitle = first?.subject?.name ? `${first.subject.name} - ${examTitle}` : examTitle;
  const duration = questions[0]?.exam?.duration ?? 60;
  return (
    <div className="px-6 min-h-screen">
      {/* Header Bar */}
      <HeaderBar
  title={
    <div className="flex items-center gap-2">
      c
      {/* النص */}
      <span className="font-semibold">[{examTitle}]</span>
      <span className="ml-2">Questions</span>
    </div>
  }
  icon={<HelpCircle className="h-12 w-12" />}
/>

      <QuestionsRunner
        examTitle={examTitle}
        trackTitle={trackTitle}
        questions={questions}
        durationSeconds={duration*60}
      />
    </div>
  );
}
