import {
  IconUsers,
  IconShieldCheck,
  IconUserCheck,
  IconBuilding,
  IconSchool,
  IconAlertTriangle,
} from "@tabler/icons-react";
import PolicySection from "./Policysection";
import RoleCards from "./Rolecards";

const sections = [
  {
    id: "account-types",
    icon: <IconUsers size={20} />,
    iconStyle: "blue",
    title: "Account types & sign-up",
    subtitle: "Who can join and how",
    type: "roles",
  },
  {
    id: "verification",
    icon: <IconShieldCheck size={20} />,
    iconStyle: "teal",
    title: "Verification & document submission",
    subtitle: "Companies and colleges must verify their identity before going live",
    rules: [
      {
        text: (
          <>
            After signing up, <strong>companies</strong> and{" "}
            <strong>colleges</strong> must upload required documents — including
            a valid <strong>tax ID</strong> — before their account is activated
            and visible on the platform.{" "}
            <span className="badge badge-amber">⏱ Pending review</span>
          </>
        ),
      },
      {
        text: "Submitted documents are reviewed by the Darrabny team. Accounts remain in a restricted state until verification is approved.",
      },
      {
        text: "Submitting false, altered, or invalid documents will result in permanent account suspension and possible legal action.",
      },
      {
        text: "Darrabny reserves the right to request additional documents at any time to maintain platform integrity.",
      },
    ],
  },
  {
    id: "users",
    icon: <IconUserCheck size={20} />,
    iconStyle: "blue",
    title: "User policies",
    subtitle: "Rules for students and applicants",
    rules: [
      {
        text: (
          <>
            Users may browse and <strong>apply to internship listings</strong>{" "}
            posted by verified companies on the platform.
          </>
        ),
      },
      {
        text: "All information submitted in applications — CVs, cover letters, and profiles — must be accurate and up to date. Misrepresentation may result in account removal.",
      },
      {
        text: "Users may only apply to internships that match their eligibility. Applying to positions with fabricated qualifications is a violation of these policies.",
      },
      {
        text: "Users are responsible for responding promptly to company communications and completing onboarding steps if accepted.",
      },
    ],
  },
  {
    id: "companies",
    icon: <IconBuilding size={20} />,
    iconStyle: "teal",
    title: "Company policies",
    subtitle: "Rules for verified companies posting internships",
    rules: [
      {
        text: (
          <>
            Verified companies may <strong>post internship listings</strong>{" "}
            with accurate descriptions, requirements, location, and duration.
          </>
        ),
      },
      {
        text: (
          <>
            Companies can view all applications for their listings, along with{" "}
            <strong>AI-generated pros and cons</strong>{" "}
            <span className="badge badge-purple">✦ AI-assisted</span> for each
            candidate to support fair and efficient review.
          </>
        ),
      },
      {
        text: "Internship postings must represent real, paid or structured training opportunities. Exploitative, misleading, or illegal listings will be removed and may result in account suspension.",
      },
      {
        text: "Companies may not contact applicants outside of the platform or use collected data for purposes beyond hiring within Darrabny.",
      },
      {
        text: "AI-generated applicant summaries are advisory only. Final hiring decisions rest entirely with the company.",
      },
    ],
  },
  {
    id: "colleges",
    icon: <IconSchool size={20} />,
    iconStyle: "purple",
    title: "College policies",
    subtitle: "Rules for verified educational institutions",
    rules: [
      {
        text: (
          <>
            Verified colleges can view and manage{" "}
            <strong>partnership requests</strong> from companies seeking to
            collaborate with their institution.
          </>
        ),
      },
      {
        text: (
          <>
            Colleges can monitor <strong>enrolled students</strong> from their
            institution who are currently participating in an internship through
            the platform.
          </>
        ),
      },
      {
        text: (
          <>
            Upon internship completion, colleges have access to{" "}
            <strong>post-internship reports</strong> — assessments submitted by
            companies or students that summarize the training experience.
          </>
        ),
      },
      {
        text: "Colleges may not share student data or internship reports with third parties outside of officially approved academic use.",
      },
      {
        text: "Colleges are responsible for keeping their registered student list accurate and up to date to ensure proper matching and tracking.",
      },
    ],
  },
  {
    id: "conduct",
    icon: <IconAlertTriangle size={20} />,
    iconStyle: "coral",
    title: "General conduct & enforcement",
    subtitle: "Rules that apply to all account types",
    rules: [
      {
        text: "All users must treat others on the platform with professionalism and respect. Harassment, discrimination, or abusive behavior is strictly prohibited.",
      },
      {
        text: "Accounts found attempting to manipulate AI evaluations, game platform rankings, or abuse platform features will be suspended.",
      },
      {
        text: "Darrabny may update these policies at any time. Continued use of the platform after updates constitutes acceptance of the revised terms.",
      },
      {
        text: "Violations may be reported using the in-platform report feature. Darrabny investigates all reports and takes appropriate action.",
      },
    ],
  },
];

export const metadata = {
  title: "Policies — Darrabny",
  description:
    "Platform policies and guidelines for users, companies, and colleges on Darrabny.",
};

export default function PoliciesPage() {
  return (
    <div className="page-wrapper">

      <div className="hero">
        <h1>
          Platform <span className="accent">policies</span> &amp; guidelines
        </h1>
        <p>
          Rules and responsibilities for everyone on Darrabny — users,
          companies, and colleges.
        </p>
      </div>

      <main className="content">
        {sections.map((section) => (
          <PolicySection key={section.id} section={section}>
            {section.type === "roles" && <RoleCards />}
          </PolicySection>
        ))}

        <div className="footer-note">
          <span className="footer-icon">ℹ</span>
          These policies were last updated on June 2026. For questions or
          concerns, reach out to the Darrabny support team through your account
          dashboard.
        </div>
      </main>
    </div>
  );
}