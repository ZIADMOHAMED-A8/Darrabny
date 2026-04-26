"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import JobCard from "./job-card";
import { useUpdateInternship } from "../../_hooks/use-update-internship";
import InternshipPostForm from "../../_components/internship-post-form";

type InternshipApi = {
  _id: string;
  internshipTittle: string;
  internshipLocation: string;
  workingTime: string;
  postedAgo: string;
  internshipDescription: string;
  technicalSkills: string[];
  softSkills: string[];
  seniorityLevel: string;
  durationInMonths: number;
  thumbnail: string;
};

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2 text-[15px] text-[#374151]">
      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1686E6]" />
      <span>{text}</span>
    </li>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="text-[20px] font-bold text-[#0B1B35] mb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function InternshipDetailPage({
  data,
}: {
  data: InternshipApi;
}) {
  const router = useRouter();

  const [openForm, setOpenForm] = useState(false);
  const mode = "edit";

  const {
    internshipTittle,
    internshipLocation,
    workingTime,
    postedAgo,
    internshipDescription,
    technicalSkills,
    softSkills,
    seniorityLevel,
    durationInMonths,
  } = data;

  return (
    <div className="min-h-screen bg-white">
      {/* Job Card */}
      <div className="px-16 pt-8 pb-6 border-b">
        <JobCard {...data} />
      </div>

      {/* Details Section */}
      <div className="px-16">
        {/* Header */}
        <div className="flex justify-between items-start mt-7">
          <div>
            <h1 className="text-[28px] font-bold text-[#0B1B35]">
              {internshipTittle}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-[#6B7280]">
              <span>{internshipLocation}</span>
              <span className="bg-[#1686E6] text-white px-3 py-0.5 rounded-full text-xs">
                {workingTime}
              </span>
              <span>Posted {postedAgo}</span>
            </div>
          </div>
          <button onClick={() => router.back()}>
            <X />
          </button>
        </div>

        <Section title="About">
          <p className="text-[15px] text-[#374151]">{internshipDescription}</p>
        </Section>

        <Section title="Technical Skills">
          <ul className="grid md:grid-cols-2 gap-3">
            {technicalSkills.map((item, i) => (
              <CheckItem key={i} text={item} />
            ))}
          </ul>
        </Section>

        <Section title="Soft Skills">
          <ul className="grid md:grid-cols-2 gap-3">
            {softSkills.map((item, i) => (
              <CheckItem key={i} text={item} />
            ))}
          </ul>
        </Section>

        <Section title="Details">
          <ul className="space-y-2">
            <CheckItem text={`Duration: ${durationInMonths} months`} />
            <CheckItem text={`Level: ${seniorityLevel}`} />
          </ul>
        </Section>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-8 pb-8">
          <button className="border border-red-200 text-red-600 hover:bg-red-50 px-6 py-2 rounded-lg text-sm transition">
            Delete
          </button>

          <button
            onClick={() => setOpenForm(true)}
            className="border border-blue-200 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg text-sm transition"
          >
            Edit
          </button>
        </div>

        {/* Modal */}
        {openForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
           <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl relative shadow-lg">
              <button
                onClick={() => setOpenForm(false)}
                className="absolute top-3 right-3"
              >
                <X />
              </button>

              <InternshipPostForm
                mode={mode}
                internshipId={data._id}
                defaultValues={data}
                onCancel={() => setOpenForm(false)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}