import { isValidRole, Role } from "@/lib/types/signup";
import UserSignupForm from "./_components/user-signup-form";
import CompanySignupForm from "./_components/company-signup-form";

export default function Page({ searchParams }: { searchParams: { role?: string } }) {
  const roleFromParams = searchParams.role ?? null;
  const role: Role = isValidRole(roleFromParams) ? roleFromParams : "user";

  return (
    <>
      {role === "user" && <UserSignupForm />}
      {role === "company" && <CompanySignupForm />}
      {/* university later */}
    </>
  );
}