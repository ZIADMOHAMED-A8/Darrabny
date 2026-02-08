import AuthBackground from "./auth-background";
import AuthLeftPanel from "./auth-left-panel";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-screen">
      <AuthBackground />

      <div className="mx-auto grid min-h-screen max-w-[1400px] grid-cols-1 items-center gap-10 px-6 py-10 lg:grid-cols-2 lg:px-12 items-stretch">
        {/* Left marketing */}
        <div className="hidden lg:block ">
          <AuthLeftPanel />
        </div>

        {/* Right form area */}
        <div className="flex justify-center lg:justify-end">
          {children}
        </div>
      </div>

      <p className="absolute bottom-6 right-8 text-xs text-slate-500">
        © 2026 Darrabny. All rights reserved.
      </p>
    </main>
  );
}
