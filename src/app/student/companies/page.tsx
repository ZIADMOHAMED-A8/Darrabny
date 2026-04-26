import CompaniesBg from "./components/companies-bg";
import CompaniesSection from "./components/companies-section";


export default function CompaniesPage() {
  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
      <CompaniesBg />

      <div className="relative z-10">
        <CompaniesSection />
      </div>
    </main>
  )
}
