import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
// import ArrowBack from "@/components/arrow-back";
import HeaderBar from "@/components/header-bar";
import ArrowBack from "@/components/arrow-back";
import { GET as getExams } from "@/app/api/exams/route";


type Params = { slugId: string };

type Exam = {
  _id: string;
  title: string;
  numberOfQuestions: number;
  duration: number;
};

export default async function ExamsPage({ params }: { params: Params }) {
  const { slugId } = params;
  const subjectId = slugId.split("-").pop();
  if (!subjectId) return notFound();

  const baseUrl =
    process.env.NEXTAUTH_URL ||
    "http://localhost:3000";

  const cookieHeader = cookies()
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

    const res = await fetch(`https://exam-app-back-iota.vercel.app/exams/${subjectId}`);

  if (!res.ok) {
    return (

      <div className="mx-auto max-w-5xl px-4 py-8">
       
        <div className="mb-6 flex items-stretch gap-3">
          <ArrowBack />

          <div className="mb-6 flex items-center gap-3 rounded-md bg-[#155DFC] px-4 py-4 text-white">
            <GraduationCap className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Exams</h1>
          </div>

        </div>


        <p className="text-red-500">حدث خطأ أثناء تحميل الامتحانات.</p>
      </div>
    );
  }

  const data = await res.json();
  const exams: Exam[] = data.exams ?? [];

  return (
    <div className="mx-auto px-6">
         {/* Header Bar */}
         <HeaderBar title="Exams" />

      {exams.length === 0 ? (
        <p className="text-gray-600 text-center">لا توجد امتحانات متاحة حتى الآن.</p>
      ) : (
        <>
          <ul className="space-y-3">
            {exams.map((ex) => (
              <li key={ex._id}>
                <Link
                  href={`/${slugId}/exams/${ex._id}`}
                  className={[
                    "block rounded-md border transition",
                    "bg-[#EEF5FF] border-[#E5EEFF]",
                    "hover:bg-[#E1ECFF] hover:border-[#D6E5FF]",
                    "px-4 py-4",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-[#155DFC]">
                        {ex.title}
                      </h2>
                      <p className="mt-1 text-xs text-gray-500">
                        {ex.numberOfQuestions} Questions
                      </p>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Duration: {ex.duration} minutes</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-xs text-gray-500">End of list</p>
        </>
      )}
    </div>
  );
}
