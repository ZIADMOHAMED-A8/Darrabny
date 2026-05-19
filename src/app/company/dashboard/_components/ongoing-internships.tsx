"use client";

import type { CompanyInternship } from "../actions/get-company-dashboard.action";

interface OngoingInternshipsProps {
  internships: CompanyInternship[];
}

export default function OngoingInternships({
  internships,
}: OngoingInternshipsProps) {
  return (
    <div className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Ongoing Internships
        </h2>
      </div>

      {internships.length === 0 ? (
        <div className="px-6 py-12 text-center text-gray-500">
          No ongoing internships
        </div>
      ) : (
        <>
          <div className="px-6 py-3 bg-gray-50">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr] gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              <div>Student</div>
              <div>Role</div>
              <div>Status</div>
              <div className="text-right">Count</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {internships.map((internship) => (
              <InternshipRow key={internship.internshipId} internship={internship} />
            ))}
          </div>

          <div className="px-6 py-4 bg-gray-50 text-center text-xs text-gray-500">
            Showing {internships.length} internship{internships.length !== 1 ? "s" : ""}
          </div>
        </>
      )}
    </div>
  );
}

interface InternshipRowProps {
  internship: CompanyInternship;
}

function InternshipRow({ internship }: InternshipRowProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "onboarding":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const initials = internship.student.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const getInitialColor = (str: string) => {
    const colors = [
      "bg-red-100 text-red-700",
      "bg-blue-100 text-blue-700",
      "bg-purple-100 text-purple-700",
      "bg-pink-100 text-pink-700",
      "bg-indigo-100 text-indigo-700",
    ];
    return colors[str.charCodeAt(0) % colors.length];
  };

  return (
    <div className="px-6 py-4 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr] gap-4 items-center">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex-shrink-0 h-10 w-10 rounded-full font-semibold flex items-center justify-center ${getInitialColor(initials)}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {internship.student.name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              {internship.student.email}
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-700">{internship.role}</div>

        <div>
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(internship.status)}`}
          >
            {internship.status}
          </span>
        </div>

        <div className="text-right text-sm font-semibold text-blue-600">
          {internship.studentCount.current}
          {internship.studentCount.capacity != null && `/${internship.studentCount.capacity}`}
        </div>
      </div>
    </div>
  );
}
