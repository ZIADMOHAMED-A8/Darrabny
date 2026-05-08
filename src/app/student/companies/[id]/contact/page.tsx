"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Lightbulb, Pencil, Send } from "lucide-react";
import { COMPANY_PROFILES, CONTACT_TOPICS } from "../../_data/company-pages.dummy";

export default function CompanyContactPage({ params }: { params: { id: string } }) {
  const profile = COMPANY_PROFILES[params.id];
  const [message, setMessage] = useState("");
  if (!profile) {
    return (
      <main className="min-h-screen grid place-items-center bg-[#f3f7ff] px-4">
        <Link href="/companies" className="text-sm font-semibold text-[#0a79c9]">
          Company not found. Back to companies
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f3f7ff] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href={`/companies/${profile.id}`} className="mb-4 inline-flex items-center gap-2 text-[#0b1f33]/60 hover:text-[#0b1f33]">
          <ArrowLeft className="h-5 w-5" />
        </Link>

        <div className="overflow-hidden rounded-[34px] border border-[#0b1f33]/10 bg-white shadow-[0_28px_70px_rgba(16,24,40,0.14)]">
          <div className="grid md:grid-cols-[2fr_1fr]">
            <section className="p-6 md:p-10">
              <div className="flex items-start gap-3">
                <div className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-[#eaf2ff]">
                  <Building2 className="h-5 w-5 text-[#0a79c9]" />
                </div>
                <div>
                  <h1 className="text-5xl font-extrabold text-[#0b1f33]">
                    Connect with <span className="text-[#0a79c9]">{profile.name.split(" ")[0]}</span>
                  </h1>
                  <p className="mt-2 text-[#0b1f33]/60">
                    Introduce yourself and take the first step toward your internship.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-xs font-bold tracking-wide text-[#0b1f33]/55">SUBJECT</p>
                <div className="mt-2 flex items-center justify-between rounded-xl bg-[#f7f9fd] px-4 py-4 text-[#0b1f33]/85">
                  <span>Inquiry regarding Software Engineering Internship - Summer 2024</span>
                  <Pencil className="h-4 w-4 text-[#0b1f33]/40" />
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold tracking-wide text-[#0b1f33]/55">YOUR MESSAGE</p>
                  <button className="rounded-full bg-[#fff5cf] px-3 py-1 text-xs font-bold text-[#856200]">
                    ✨ Smart Template
                  </button>
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="min-h-[260px] w-full rounded-2xl border border-[#0b1f33]/10 bg-[#f7f9fd] px-4 py-3 text-sm outline-none placeholder:text-[#0b1f33]/40 focus:border-[#0a79c9]/35"
                />
              </div>

              <div className="mt-4 rounded-xl bg-[#f8fafc] px-4 py-3">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-[#2b8fd6]">
                  <Lightbulb className="h-4 w-4" /> INTERNSPARK TIP
                </p>
                <p className="mt-1 text-sm text-[#0b1f33]/75">
                  "Starting with a specific project you admire shows you've done your research!"
                </p>
              </div>

              <div className="mt-6 flex items-end justify-between">
                <p className="text-xs italic text-[#0b1f33]/50">Usually responds within 2-3 business days</p>
                <button className="inline-flex items-center gap-2 rounded-full bg-[#1489df] px-14 py-3 text-xl font-bold text-white">
                  Send <Send className="h-5 w-5" />
                </button>
              </div>
            </section>

            <aside className="border-l border-[#0b1f33]/10 bg-[#fafcff] p-6 md:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-[#0b1f33]">Quick Topics</h2>
                <span className="text-[#0b1f33]/45">×</span>
              </div>

              <p className="mt-3 text-sm text-[#0b1f33]/60">
                Need inspiration? Add these common questions with one tap:
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {CONTACT_TOPICS.map((topic) => (
                  <button key={topic} className="rounded-full border border-[#0b1f33]/10 bg-white px-3 py-1.5 text-sm text-[#0b1f33]/80">
                    {topic}
                  </button>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-[#0b1f33]/10 bg-[#eaf3fb] p-5 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-[#d9e6f8]" />
                <p className="mt-3 text-lg font-bold text-[#0b1f33]">Sarah Jenkins</p>
                <p className="text-xs text-[#0b1f33]/60">Talent Acquisition Lead</p>
                <p className="mt-3 rounded-2xl bg-white/80 px-3 py-2 text-xs text-[#0b1f33]/70">
                  "I love seeing student inquiries that highlight their passion for tech!"
                </p>
              </div>

              <div className="mt-5 rounded-2xl border border-[#0b1f33]/10 bg-white p-4">
                <p className="font-semibold text-[#0b1f33]">Headquarters</p>
                <p className="text-sm text-[#0b1f33]/60">San Francisco, CA</p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
