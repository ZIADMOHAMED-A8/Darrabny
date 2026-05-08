import Sidebar from "./_components/Sidebar";
import ProfileSection from "./_components/ProfileSection";
import NotificationSection from "./_components/NotificationSection";

const sidebarItems = [
  { label: "Dashboard", href: "/company/dashboard", icon: "dashboard" },
  { label: "Monitoring Report", href: "/company/report", icon: "report" },
  {
    label: "Company Partners",
    href: "/company/university-collaboration",
    icon: "partners",
  },
  { label: "Student Directory", href: "/company/candidates", icon: "students" },
  { label: "Settings", href: "/company/settings", icon: "settings" },
];

const profileFields = [
  { name: "fullName", label: "Full Name", value: "Sophia Chen" },
  {
    name: "email",
    label: "Email",
    type: "email",
    value: "sophia.chen@example.com",
  },
  { name: "phone", label: "Phone Number", value: "(123) 456-7890" },
  { name: "address", label: "Address", value: "San Francisco, CA" },
];

const notificationItems = [
  {
    key: "email",
    label: "Email Notifications",
    description:
      "Receive updates about new internships, application status changes, and platform announcements.",
    enabled: true,
  },
  {
    key: "push",
    label: "Push Notifications",
    description: "Get instant alerts for important updates and reminders.",
    enabled: true,
  },
  {
    key: "sms",
    label: "SMS Notifications",
    description: "Receive SMS notifications for urgent updates and reminders.",
    enabled: false,
  },
];

export default function CompanySettingsPage() {
  return (
    <main className="min-h-screen bg-[#e8edf8]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1600px]">
        <Sidebar
          sectionTitle="SUPERVISORY PORTAL"
          sectionSubtitle="COMPANY ADMIN"
          menuItems={sidebarItems}
          logoutLabel="Logout"
        />

        <div className="relative flex-1 overflow-hidden px-6 py-7 md:px-8">
          <div className="pointer-events-none absolute right-0 top-0 h-[280px] w-[420px] bg-[radial-gradient(circle_at_top_right,rgba(116,150,214,0.25),transparent_65%)]" />

          <div className="relative max-w-[980px]">
            <ProfileSection title="Settings" fields={profileFields} />
            <NotificationSection
              title="Notification Preferences"
              notifications={notificationItems}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
