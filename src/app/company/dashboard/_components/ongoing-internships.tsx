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
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Ongoing Interns
        </h2>
      </div>

      {internships.length === 0 ? (
        <div className="px-4 py-12 text-center text-gray-500 sm:px-6">
          No ongoing internships
        </div>
      ) : (
        <>
          <div className="hidden bg-gray-50 px-6 py-3 sm:block">
            <div className="grid grid-cols-[2fr_1.5fr_1fr_0.8fr] gap-4 text-xs font-semibold uppercase tracking-wide text-gray-600">
              <div>Student</div>
              <div>Role</div>
              <div>Status</div>
              <div className="text-right">Total Students</div>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {internships.map((internship) => (
              <InternshipRow key={internship.internshipId} internship={internship} />
            ))}
          </div>

          <div className="bg-gray-50 px-4 py-4 text-center text-xs text-gray-500 sm:px-6">
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
    <div className="px-4 py-4 transition-colors hover:bg-gray-50 sm:px-6">
      <div className="grid gap-3 sm:grid-cols-[2fr_1.5fr_1fr_0.8fr] sm:items-center sm:gap-4">
        <div className="flex min-w-0 items-center gap-3">
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

        <div className="text-sm text-gray-700">
          <span className="font-semibold text-gray-500 sm:hidden">Role: </span>
          {internship.role}
        </div>

        <div>
          <span
            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(internship.status)}`}
          >
            {internship.status}
          </span>
        </div>

        <div className="text-sm font-semibold text-blue-600 sm:text-right">
          <span className="font-semibold text-gray-500 sm:hidden">Count: </span>
          {internship.studentCount.current}
          {internship.studentCount.capacity != null && `/${internship.studentCount.capacity}`}
        </div>
      </div>
    </div>
  );
}
