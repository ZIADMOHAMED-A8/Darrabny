import HomeBg from "../_components/home-bg";
import Sidebar from "../_components/Sidebar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex z-100 ">
      <Sidebar />
      <main className="flex-1  min-h-screen p-8 bg-blue-200">
        {children}
      </main>
    </div>
  );
}
