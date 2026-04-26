"use client";

import Image from "next/image";
import { useState } from "react";

type Session = {
  id: string;
  name: string;
  avatar: string;
  specialization: string;
  availability: string;
};

const SESSIONS: Session[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar:
      "/images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    specialization: "Career Development",
    availability: "Monday, 2 PM - 3 PM",
  },
  {
    id: "2",
    name: "David Lee",
    avatar:
      "/images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    specialization: "Resume Writing",
    availability: "Tuesday, 10 AM - 11 AM",
  },
  {
    id: "3",
    name: "Emily Wong",
    avatar:
      "/images.unsplash.com/photo-1545996124-0501ebae84d0?w=200&q=80",
    specialization: "Interview Skills",
    availability: "Wednesday, 4 PM - 5 PM",
  },
];

function PageBg() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Image
        src="/bg.png"
        alt=""
        fill
        priority
        className="object-cover opacity-90"
      />
    </div>
  );
}

export default function CareerCounselingPage() {
  const [bookingId, setBookingId] = useState<string | null>(null);

  function book(id: string) {
    setBookingId(id);
    alert("Booked! (demo)");
  }

  return (
    <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
      <PageBg />

      <div className="relative z-10 pt-10 pb-16">
        {/* Title */}
        <h1 className="text-4xl font-extrabold">Career Counseling</h1>
        <p className="mt-2 max-w-3xl text-sm text-white/75">
          Book a session with a career counselor to discuss your career goals,
          resume, interview skills, and more.
        </p>

        {/* Section title */}
        <h2 className="mt-10 text-2xl font-extrabold">Available Sessions</h2>

        {/* Table Card */}
        <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_12px_28px_rgba(0,0,0,0.25)]">
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_1.2fr_1.4fr_0.6fr] items-center bg-[#cfe0ff] px-6 py-4 text-xs font-bold text-[#0b1f33]/75">
            <div>Counselor</div>
            <div>Specialization</div>
            <div>Availability</div>
            <div>Action</div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-200">
            {SESSIONS.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[1.4fr_1.2fr_1.4fr_0.6fr] items-center px-6 py-5"
              >
                {/* Counselor */}
                <div className="flex items-center gap-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-200">
                    <Image
                      src={s.avatar}
                      alt={s.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="font-semibold text-[#0b1f33]">{s.name}</div>
                </div>

                {/* Specialization */}
                <div className="text-sm text-[#0b1f33]/75">
                  {s.specialization}
                </div>

                {/* Availability */}
                <div className="text-sm text-[#0b1f33]/75">
                  {s.availability}
                </div>

                {/* Action */}
                <div>
                  <button
                    onClick={() => book(s.id)}
                    className="rounded-md bg-[#1f7ed6] px-6 py-2 text-sm font-bold text-white hover:bg-[#1b72c2]"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: just to keep same spacing on short pages */}
        <div className="h-10" />
      </div>
    </main>
  );
}
