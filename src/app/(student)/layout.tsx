import HomeBg from "../_components/home-bg";
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
        <main className="flex-1 min-h-[calc(100vh-72px)] p-8 bg-blue-100">
          {children}
        </main>
      </div>
    </div>
  );
}
