import FeaturedInternships from "./_components/featured-internships";
import HeroSection from "./_components/hero-section";
import HomeBg from "./_components/home-bg";
import HowItWorks from "./_components/how-it-works";
import ReadyToStart from "./_components/ready-to-start";


export default function HomePage() {
  // Translation
  // Navigation
  // State
  // Ref
  // Context
  // Hooks
  // Queries
  // Mutation
  // Form & validation
  // Variables
  // Functions
  // Effects

  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
      <HomeBg />
      <div className="relative z-10">
        <HeroSection />
        <FeaturedInternships />
        <HowItWorks />
        <ReadyToStart />
      </div>
    </main>
  )
}
