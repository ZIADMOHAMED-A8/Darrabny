"use client";

import { usePathname } from "next/navigation";
import StudentTopBar from "./StudentTopBar";

const authPathPrefixes = [
  "/login",
  "/signup",
  "/otp",
  "/create-pass",
  "/forget-password",
  '/policies'
];

export default function ConditionalStudentTopBar() {
  const pathname = usePathname();
  const isAuthPage = authPathPrefixes.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  if (isAuthPage) {
    return null;
  }

  return <StudentTopBar />;
}
