// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import type { Internship } from "@/app/internships/_data/internships";
// import { CheckCircle2, X } from "lucide-react";
// import InternshipsFilters from "@/app/internships/_components/internships-filters";

// /* Filters data (same as internships page) */
// const SPECIALIZATIONS = [
//   "Software",
//   "Data",
//   "Marketing",
//   "UI/UX",
//   "Finance",
//   "Research",
// ];
// const LOCATIONS = ["Cairo", "Alexandria", "Giza", "Remote"];
// const TRAINING_TYPES = ["Full-time", "Part-time"];
// const DURATIONS = ["3 months", "6 months", "12 months"];
// const SKILLS = ["React", "Tailwind", "SQL", "Python", "Figma", "Excel"];

// export default function InternshipDetails({ data }: { data: Internship }) {
//   const [tab, setTab] = useState<"overview" | "reviews">("overview");

//   /* Filters state */
//   const [q, setQ] = useState("");
//   const [specialization, setSpecialization] = useState("");
//   const [skill, setSkill] = useState("");
//   const [location, setLocation] = useState("");
//   const [trainingType, setTrainingType] = useState("");
//   const [duration, setDuration] = useState("");

//   function clearFilters() {
//     setQ("");
//     setSpecialization("");
//     setSkill("");
//     setLocation("");
//     setTrainingType("");
//     setDuration("");
//   }

//   function applyFilters() {
//     // UI only in details page (same look as figma).
//     // Later: navigate to /internships with query params if needed.
//   }

//   return (
//     <main className="relative px-16 min-h-screen overflow-hidden bg-[var(--ic-bg)] text-white">
//       {/* Background */}
//       <div className="absolute inset-0 pointer-events-none">
//         <Image
//           src="/bg.png"
//           alt=""
//           fill
//           priority
//           className="object-cover opacity-90"
//         />
//       </div>

//       <div className="relative z-10 pt-6 pb-16">
//         {/* Filters (same component used in internships page) */}
//         <InternshipsFilters
//           q={q}
//           specialization={specialization}
//           skill={skill}
//           location={location}
//           trainingType={trainingType}
//           duration={duration}
//           setQ={setQ}
//           setSpecialization={setSpecialization}
//           setSkill={setSkill}
//           setLocation={setLocation}
//           setTrainingType={setTrainingType}
//           setDuration={setDuration}
//           onClear={clearFilters}
//           onApply={applyFilters}
//           SPECIALIZATIONS={SPECIALIZATIONS}
//           LOCATIONS={LOCATIONS}
//           TRAINING_TYPES={TRAINING_TYPES}
//           DURATIONS={DURATIONS}
//           SKILLS={SKILLS}
//         />

//         {/* Small internship card */}
//         <div className="mt-7 flex justify-center">
//           <div className="w-full max-w-[560px] rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_14px_40px_rgba(0,0,0,0.25)]">
//             <div className="flex gap-4 p-4">
//               <div className="relative h-20 w-20 overflow-hidden rounded-xl bg-white">
//                 <Image
//                   src={data.image}
//                   alt={data.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>

//               <div className="flex-1">
//                 <p className="text-xs font-semibold text-slate-600">
//                   {data.company}
//                 </p>
//                 <h3 className="text-base font-extrabold">{data.title}</h3>

//                 <div className="mt-2 text-xs text-slate-600">
//                   <span>{data.workMode}</span> <span className="mx-2">•</span>
//                   <span>{data.type}</span> <span className="mx-2">•</span>
//                   <span>{data.duration}</span>
//                 </div>
//               </div>

//               <div className="grid place-items-center text-[#0b1f33]/60">
//                 <span className="h-5 w-5 rounded border border-[#0b1f33]/20" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Big details panel */}
//         {/* Big details panel (match figma screenshot) */}
//         <section className="mt-10 rounded-2xl bg-[#dbeafe] text-[#0b1f33] shadow-[0_18px_60px_rgba(0,0,0,0.35)] overflow-hidden">
//           {/* Top area */}
//           <div className="relative px-12 pt-10">
//             <Link
//               href="/internships"
//               aria-label="Close"
//               className="absolute right-10 top-8 text-[#0b1f33]/70 hover:text-[#0b1f33]"
//             >
//               <X className="h-8 w-8" />
//             </Link>

//             <h1 className="text-[40px] leading-[1.05] font-extrabold">
//               {data.title}
//             </h1>

//             <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-[#0b1f33]/55">
//               <span>{data.company}</span>
//               <span>|</span>
//               <span>{data.workMode}</span>

//               {/* Remote pill */}
//               <span className="ml-2 rounded-full bg-[#5a67d8] px-3 py-1 text-xs font-bold text-white">
//                 {data.workMode}
//               </span>

//               <span className="ml-2">{data.posted}</span>
//             </div>

//             {/* Tabs */}
//             <div className="mt-10 flex items-end gap-8 text-sm font-semibold">
//               <button
//                 onClick={() => setTab("overview")}
//                 className={
//                   tab === "overview"
//                     ? "text-[#1f7ed6]"
//                     : "text-[#0b1f33]/55 hover:text-[#0b1f33]"
//                 }
//               >
//                 Overview
//                 {tab === "overview" && (
//                   <span className="mt-2 block h-[2px] w-[86px] bg-[#1f7ed6]" />
//                 )}
//               </button>

//               <button
//                 onClick={() => setTab("reviews")}
//                 className={
//                   tab === "reviews"
//                     ? "text-[#1f7ed6]"
//                     : "text-[#0b1f33]/55 hover:text-[#0b1f33]"
//                 }
//               >
//                 Reviews
//                 {tab === "reviews" && (
//                   <span className="mt-2 block h-[2px] w-[70px] bg-[#1f7ed6]" />
//                 )}
//               </button>
//             </div>

//             {/* Divider */}
//             <div className="mt-4 h-px w-full bg-[#0b1f33]/15" />
//           </div>

//           {/* Content */}
//           <div className="px-12 pb-10 pt-8">
//             {tab === "overview" ? (
//               <>
//                 <h2 className="text-2xl font-extrabold">
//                   About the Internship
//                 </h2>
//                 <p className="mt-4 max-w-[980px] text-[15px] leading-7 text-[#0b1f33]/75">
//                   {data.about}
//                 </p>

//                 {/* Two column sections like screenshot */}
//                 <div className="mt-12 grid gap-12 md:grid-cols-2">
//                   {/* Left */}
//                   <div>
//                     <h3 className="text-2xl font-extrabold">
//                       Responsibilities
//                     </h3>

//                     <ul className="mt-6 space-y-4 text-[15px] text-[#0b1f33]/75">
//                       {data.responsibilities.map((item) => (
//                         <li key={item} className="flex gap-3">
//                           <CheckCircle2 className="mt-[2px] h-5 w-5 text-[#1f7ed6]" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <h3 className="mt-14 text-2xl font-extrabold">
//                       Company Information
//                     </h3>
//                     <p className="mt-4 text-[15px] leading-7 text-[#0b1f33]/75">
//                       {data.companyInfo}
//                     </p>
//                   </div>

//                   {/* Right */}
//                   <div>
//                     <h3 className="text-2xl font-extrabold">Requirements</h3>

//                     <ul className="mt-6 space-y-4 text-[15px] text-[#0b1f33]/75">
//                       {data.requirements.map((item) => (
//                         <li key={item} className="flex gap-3">
//                           <CheckCircle2 className="mt-[2px] h-5 w-5 text-[#1f7ed6]" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>

//                     <h3 className="mt-14 text-2xl font-extrabold">Benefits</h3>

//                     <ul className="mt-6 grid gap-4 md:grid-cols-1 text-[15px] text-[#0b1f33]/75">
//                       {data.benefits.map((item) => (
//                         <li key={item} className="flex gap-3">
//                           <CheckCircle2 className="mt-[2px] h-5 w-5 text-[#1f7ed6]" />
//                           <span>{item}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Bottom actions like screenshot */}
//                 <div className="mt-14 flex items-center justify-end gap-3">
//                   <button className="rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[#0b1f33] shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-white/90">
//                     Save
//                   </button>

//                   <button className="rounded-md bg-[#1f7ed6] px-7 py-2.5 text-sm font-bold text-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] hover:bg-[#1b72c2]">
//                     Apply Now
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="py-8 text-sm text-[#0b1f33]/70">
//                 No reviews yet. (demo)
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }
