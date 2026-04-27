import Sidebar from "../_components/Sidebar";
import StudentTopBar from "../_components/StudentTopBar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <StudentTopBar />

      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-[#f5f8ff] p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
