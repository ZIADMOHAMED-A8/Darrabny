"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center bg-red-500">
      {/* Background image */}
      <Image
        src="/landing-background.png"
        alt="Modern office building"
        fill
        priority
        className="object-cover brightness-75"
      />

      {/* Content */}
      <div className="relative z-10 text-white w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow">
            Find your dream internship
          </h1>

          <p className="text-lg md:text-xl mb-8 opacity-95">
            Explore thousands of internships and launch your career with InternLink.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search internships by title, company, or keyword"
              className="w-full h-14 pl-5 pr-32 rounded-full text-gray-900 focus:ring-2 focus:ring-primary outline-none"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-full font-bold">
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
