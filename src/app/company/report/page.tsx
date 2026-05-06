import Link from "next/link";
import { getCompanyInternships } from "./_actions/get-company-internships.action";

export default async function CompanyReportPage() {
  const internships = await getCompanyInternships();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl bg-gradient-to-r from-[#0f3a5c] to-[#145d93] px-6 py-5 text-white shadow-lg">
          <h1 className="text-2xl font-bold md:text-3xl">Monitoring Report</h1>
          <p className="mt-2 text-sm text-blue-100">
            Track internships, evaluate students, and submit reports in one
            flow.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Internships List View
          </h2>

          {!internships.length ? (
            <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-600">
              No internships found.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {internships.map((internship) => (
                <Link
                  key={internship.id}
                  href={`/company/report/${internship.id}`}
                  className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <p className="font-semibold text-slate-900">
                    {internship.title}
                  </p>
                  <div className="mt-3 flex gap-2 text-xs">
                    <span className="rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700">
                      {internship.activeStudents} students
                    </span>
                    <span className="rounded-full bg-amber-50 px-2 py-1 font-medium text-amber-700">
                      {internship.pendingReports} pending
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
