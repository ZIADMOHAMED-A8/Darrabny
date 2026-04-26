import InternshipCard from "@/components/shared/internship-card";
import { getInternships } from "@/lib/api/company/company-internships.api";

export default async function CompanyInternshipsGrid() {
  const internships = await getInternships();

  return (
    <div className="grid items-stretch gap-6 md:grid-cols-2">
      {internships.map((it: any) => (
        <InternshipCard key={it.id} data={it} href={`./internships/${it.id}`} />
      ))}
    </div>
  );
}
