"use client";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  img: string;
  href: string;
};

export default function DiplomaCard({ title, img, href }: Props) {
  return (
    <Link
  href={href}
  prefetch
  className="group rounded-2xl relative block h-[448px] w-full overflow-hidden shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-label={`اذهب إلى امتحانات ${title}`}
>

      <Image
        src={img}
        alt={title}
        fill
        quality={100}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-3">
        <div className="bg-[#155DFC]/50 backdrop-blur-[6] px-4 py-3">
          <p className="text-center text-white text-xl font-semibold tracking-tight line-clamp-2">
            {title}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
    </Link>
  );
}
