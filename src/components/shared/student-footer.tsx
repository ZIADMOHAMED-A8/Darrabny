"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";

export default function StudentFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-14 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="h-px w-full bg-[#0b1f33]/15" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-[var(--ds-primary)] text-[11px] font-extrabold text-white">
                D
              </span>
              <span className="text-sm font-semibold text-[var(--ds-primary)]">
                Darrabny
              </span>
            </Link>
            <p className="mt-3 text-xs text-[#0b1f33]/50">
              © {year} Darrabny. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4 md:justify-end">
            <a
              href="#"
              aria-label="Facebook"
              className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
            >
              <X className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-[#0b1f33]/70 hover:text-[#0b1f33]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

