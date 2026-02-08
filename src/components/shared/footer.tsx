"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin, X } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="px-16 bg-[--ic-bg] text-white">
      <div className="mx-auto px-4 py-6">
        {/* Divider */}
        <div className="h-px w-full bg-white/15 mb-6" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0b2a44] text-sm font-bold">
              D
            </span>
            <span className="font-semibold text-[#4bb4ff]">Darrabny</span>
          </Link>

          {/* Copyright */}
          <p className="text-sm text-white/70">
            © {year} Darrabny. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-white/80 hover:text-white"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="X"
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-white/80 hover:text-white"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-white/80 hover:text-white"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
