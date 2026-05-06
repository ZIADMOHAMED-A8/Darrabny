import { Suspense } from "react";
import Component from "./_components/login-form";
import { isValidRole, type Role } from "@/lib/types/signup";

export default function Page({
  searchParams,
}: {
  searchParams: { role?: string };
}) {
  const roleFromParams = searchParams.role ?? null;
  const role: Role = isValidRole(roleFromParams) ? roleFromParams : "user";

  return (
    <Suspense fallback={null}>
      <Component initialRole={role} />
    </Suspense>
  );
}
