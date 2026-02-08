import StatusTimeline from "./_components/status-timeline";
import CandidateCard from "./_components/candidate-card";
import SkillsCard from "./_components/skills-card";
import DocumentsCard from "./_components/documents-card";
import ProgressCard from "./_components/progress-card";
import EarnedBadgesCard from "./_components/earned-badges-card";
import EvaluatorFeedbackCard from "./_components/evaluator-feedback-card";
import ActionsCard from "./_components/actions-card";
import { candidateProfileDummy } from "./_data/candidate-profile.dummy";

export default function CandidateProfilePage() {
  // Candidate profile page (UI only)

  return (
    <main className="min-h-screen bg-[var(--ic-bg)] text-white">
      <div className="mx-auto px-10 pb-16 pt-10">
        {/* Breadcrumb */}
        <p className="text-sm text-white/70">
          {candidateProfileDummy.breadcrumb}
        </p>

        {/* Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-6">
            <CandidateCard />
            <SkillsCard />
          </div>

          {/* Middle column */}
          <div className="lg:col-span-6 space-y-6">
            <StatusTimeline />

            {/* Documents + Progress row */}
            <div className="grid gap-6 lg:grid-cols-2">
              <DocumentsCard />
              <ProgressCard />
            </div>

            <EvaluatorFeedbackCard />
          </div>

          {/* Right column */}
          <div className="lg:col-span-3 space-y-6">
            <ActionsCard />
            <EarnedBadgesCard />
          </div>
        </div>
      </div>
    </main>
  );
}
