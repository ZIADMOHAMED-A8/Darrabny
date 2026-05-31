// app/company/report/page.tsx
import ReportBackground from "./_components/report-background";
import ReportHeader from "./_components/report-header";
import ReportInternCard from "./_components/report-intern-card";
import ReportPlacementCard from "./_components/report-placement-card";
import ReportAttachments from "./_components/report-attachments";
import ReportStatsRow from "./_components/report-stats-row";
import ReportReflection from "./_components/report-reflection";
import ReportSkills from "./_components/report-skills";
import ReportFeedback from "./_components/report-feedback";

export default function CompanyReportPage() {
  // Report page (UI only)

  return (
    <main className="relative min-h-screen bg-[var(--ic-bg)] text-white">
      {/* Background */}
      <ReportBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto px-4 pb-16 pt-8 sm:px-6 md:px-10 md:pt-10">
        {/* Top header */}
        <ReportHeader />

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <ReportInternCard />
            <ReportPlacementCard />
            <ReportAttachments />
          </aside>

          {/* Main column */}
          <section className="lg:col-span-9 space-y-6">
            <ReportStatsRow />
            <ReportReflection />
            <ReportSkills />
            <ReportFeedback />
          </section>
        </div>
      </div>
    </main>
  );
}
