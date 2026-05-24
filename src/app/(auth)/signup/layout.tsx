import { Button } from "@/components/ui/button";
import SignupLayout from "./_components/signup-layout";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SignupLayout>{children}
  </SignupLayout>;
}