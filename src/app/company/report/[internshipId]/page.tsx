import Link from "next/link";
import { getInternshipStudents } from "../_actions/get-internship-students.action";
import StudentsTable from "../_components/students-table";

type InternshipStudentsPageProps = {
  params: {
    internshipId: string;
  };
};

export default async function InternshipStudentsPage({
  params,
}: InternshipStudentsPageProps) {
  const students = await getInternshipStudents(params.internshipId);
  console.log('students',students)
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl bg-gradient-to-r from-[#0f3a5c] to-[#145d93] px-6 py-5 text-white shadow-lg">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Students List</h1>
              <p className="mt-2 text-sm text-blue-100">
                Internship ID: {params.internshipId}
              </p>
            </div>
            <Link
              href="/company/internships"
              className="rounded-md border border-white/30 px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              Back to Internships
            </Link>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Students List View
          </h2>
          <StudentsTable initialData={students} internshipId={params.internshipId} />
        </section>
      </div>
    </main>
  );
}
