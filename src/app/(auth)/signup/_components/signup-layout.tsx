"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Role, isValidRole } from "@/lib/types/signup";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

interface SignupLayoutProps {
  children: React.ReactNode;
}

export default function SignupLayout({ children }: SignupLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roleFromParams = searchParams.get("role");
  const role: Role = isValidRole(roleFromParams) ? roleFromParams : "user";

  const changeRole = (newRole: Role) => {
    router.push(`/signup?role=${newRole}`);
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-[520px] rounded-[20px] border border-black/10 bg-white/90 shadow-2xl backdrop-blur">
        <CardContent className="px-10 pb-10 pt-9">

          {/* ===== HEADER ===== */}
          <div className="flex items-center gap-3 mb-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
              aria-label="Back"
            >
              <ChevronLeft className="h-5 w-5 text-[#0B2A4A]" />
            </button>

            <h2 className="text-3xl font-semibold text-[#0B2A4A]">
              Create Account
            </h2>
          </div>

          {/* ===== TABS ===== */}
          <div className="flex justify-center items-center gap-4 text-sm font-medium mb-6">
            <button
              onClick={() => changeRole("user")}
              className={`pb-1 transition ${
                role === "user"
                  ? "text-[#0A79C9] border-b-2 border-[#0A79C9]"
                  : "text-slate-400 hover:text-[#0B2A4A]"
              }`}
            >
              User
            </button>

            <span className="text-slate-300">|</span>

            <button
              onClick={() => changeRole("company")}
              className={`pb-1 transition ${
                role === "company"
                  ? "text-[#0A79C9] border-b-2 border-[#0A79C9]"
                  : "text-slate-400 hover:text-[#0B2A4A]"
              }`}
            >
              Company
            </button>

            <span className="text-slate-300">|</span>

            <button
              onClick={() => changeRole("college")}
              className={`pb-1 transition ${
                role === "college"
                  ? "text-[#0A79C9] border-b-2 border-[#0A79C9]"
                  : "text-slate-400 hover:text-[#0B2A4A]"
              }`}
            >
              College
            </button>
          </div>

          {children}

        </CardContent>
      </Card>
    </div>
  );
}