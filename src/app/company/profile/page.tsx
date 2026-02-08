import CompanyCover from "./_components/company-cover";
import CompanyHeader from "./_components/company-profile-header";
// import CompanyHeader from "./_components/company-header"

import AboutCard from "./_components/about-card";
import TrainingCard from "./_components/training-card";
import ActiveInternshipsCard from "./_components/active-internships-card";
import ReviewsSection from "./_components/reviews-section";

import StatsGrid from "./_components/stats-grid";
import AccountSettingsCard from "./_components/account-settings-card";
import CompanyDetailsCard from "./_components/company-details-card";

export default function CompanyProfilePage() {
  // Company profile page (UI only)

  return (
    <main className="min-h-screen bg-[var(--ic-bg)] text-white">
      <div className="mx-auto pb-16">
        {/* Cover + overlay header */}
        <div className="relative">
          <CompanyCover />

          {/* Header overlay */}
          <div className="absolute left-0 right-0 -bottom-40 px-10">
            <CompanyHeader />
          </div>
        </div>

        {/* Space after overlay */}
        <div className="h-20" />
      </div>
      <div className="mx-auto flex flex-col gap-6 mt-10 px-10">
        <div className="flex gap-6 items-stretch">
          <div className="w-2/3">
            <AboutCard />
          </div>
          <div className="w-1/3">
            <StatsGrid />
          </div>
        </div>
        <div className="flex gap-6 items-stretch">
          <div className="w-2/3">
            <TrainingCard />
          </div>
          <div className="w-1/3">
            <AccountSettingsCard />
          </div>
        </div>
        <div className="flex gap-6 items-stretch">
          <div className="w-2/3">
            <ActiveInternshipsCard />
          </div>
          <div className="w-1/3">
            <CompanyDetailsCard />
          </div>
        </div>
        {/* Reviews section */}
        <div className="flex gap-6 items-stretch">
          <div className="w-2/3">
            <ReviewsSection />
          </div>

          {/* Empty spacer to keep alignment with other rows */}
          <div className="w-1/3" />
        </div>
      </div>
    </main>
  );
}
