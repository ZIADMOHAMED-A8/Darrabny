import { isValidRole, Role } from "@/lib/types/signup";
import UserSignupForm from "./_components/user-signup-form";
import CompanySignupForm from "./_components/company-signup-form";
import CollegeSignupForm from "./_components/college-signup-form";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const roleFromParams = searchParams.role ?? null;
  const role: Role = isValidRole(roleFromParams) ? roleFromParams : "user";

  return (
    <Suspense fallback={null}>
      {role === "user" && <UserSignupForm />}
      {role === "company" && <CompanySignupForm />}
      {role === "college" && <CollegeSignupForm />}
    </Suspense>
  );
}
