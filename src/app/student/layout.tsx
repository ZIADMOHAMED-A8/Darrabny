"use client"
import { usePathname } from "next/navigation";
import Sidebar from "../_components/Sidebar";
import StudentTopBar from "../_components/StudentTopBar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname()
  if (pathName === '/student/dashboard' ||
    pathName === '/student/applications' ||
    pathName === '/student/settings' ||
    pathName === '/profile' ||
    pathName === '/student/Inprogressinternships' 
    
  )

    return (
      <div className="min-h-screen flex flex-col">

        <div className="flex flex-1">
          <Sidebar></Sidebar>

          <main className="flex-1 bg-[#f5f8ff] p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    );
  else {
    return (
      <div className="min-h-screen flex flex-col">

        <div className="flex flex-1">

          <main className="flex-1 bg-[#f5f8ff] p-4 sm:p-6 md:p-8">
            {children}
          </main>
        </div>
      </div>
    );
  }
}
