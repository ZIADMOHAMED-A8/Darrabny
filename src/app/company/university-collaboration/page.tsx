import HubHeader from "./_components/hub-header";
import HubTable from "./_components/hub-table";
import HubSummaryCards from "./_components/hub-summary-cards";
import HubBackground from "./_components/hub-background";

export default function UniversityHubPage() {
  // University hub page (UI only)

  return (
    <main className="relative min-h-screen bg-[var(--ic-bg)] text-white">
      {/* Background */}
      <HubBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto px-10 pb-16 pt-10">
        {/* Top header */}
        <HubHeader />

        {/* Main content */}
        <div className="mt-6 space-y-6">
          <HubTable />
          <HubSummaryCards />
        </div>
      </div>
    </main>
  );
}
