"use client";

import Image from "next/image";

export default function CompanyBg() {
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
