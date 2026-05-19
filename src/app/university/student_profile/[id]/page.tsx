"use client";

import { useParams } from "next/navigation";

import { useStudentProfile } from "../hooks/use-student-profile";

import CompetenciesCard from "../components/competencies-card";
import ProfessionalExperience from "../components/professional-experience";
import CompanyEvaluations from "../components/company-evaluations";
import ProfileHeader from "../components/profile-header";
import AcademicRecordCard from "../components/academic-record-card";

export default function StudentProfilePage() {
  const params = useParams();

  const studentId = params.id as string;

  const { data, isLoading } = useStudentProfile(studentId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading profile...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Failed to load profile.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F7FB] py-10 px-8">
      <div className="max-w-[1400px] mx-auto">
        <ProfileHeader basicInfo={data.basicInfo} />

        <div className="grid grid-cols-[340px_1fr] gap-8 mt-8">
          {/* LEFT */}
          <div className="space-y-8">
            <CompetenciesCard
              skills={data.coreCompetencies}
            />

            <AcademicRecordCard
              record={data.academicRecord}
            />
          </div>

          {/* RIGHT */}
          <div>
            <ProfessionalExperience
              items={data.professionalExperience}
            />

            <CompanyEvaluations
              items={data.companyEvaluations}
            />
          </div>
        </div>
      </div>
    </main>
  );
}