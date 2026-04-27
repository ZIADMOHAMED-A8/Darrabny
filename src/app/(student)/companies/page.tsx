import CompaniesSection from "./components/companies-section";
import StudentFooter from "@/components/shared/student-footer";


export default function CompaniesPage() {
  return (
    <main className="relative min-h-screen bg-[#f3f7ff]">
      <div className="w-full">
        <CompaniesSection />
        <StudentFooter />
      </div>
    </main>
  );
}
