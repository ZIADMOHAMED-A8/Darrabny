"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  Facebook,
  Instagram,
  Linkedin,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("bg-white px-6 py-8 text-[#07182c] md:px-20", className)}>
      <div className="w-full">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-[5px] bg-[#2396ec] text-white">
            <BriefcaseBusiness className="h-4 w-4" strokeWidth={2.4} />
          </span>
          <span className="text-sm font-bold text-[#2396ec]">Darrabny</span>
        </Link>

        <div className="mt-9 border-t border-[#07182c]/35 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-[#07182c]/40">
              © 2025 Darrabny. All rights reserved.
            </p>

            <div className="flex items-center gap-5 text-[#07182c]">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-colors hover:text-[#2396ec]"
              >
                <Facebook className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              </a>
              <a
                href="#"
                aria-label="X"
                className="transition-colors hover:text-[#2396ec]"
              >
                <X className="h-5 w-5" strokeWidth={2.2} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="transition-colors hover:text-[#2396ec]"
              >
                <Instagram className="h-5 w-5" strokeWidth={2.2} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="transition-colors hover:text-[#2396ec]"
              >
                <Linkedin className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
