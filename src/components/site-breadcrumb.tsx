"use client";

import { usePathname } from "next/navigation";
import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function SiteBreadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathname === "/" ? (
            <span className="capitalize text-blue-500 font-semibold text-lg [text-shadow:0_0_0.5px_#2B7FFF]">
              Home
            </span>
          ) : (
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {parts.map((part, index) => {
          const href = "/" + parts.slice(0, index + 1).join("/");
          const isLast = index === parts.length - 1;

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <span className="capitalize text-blue-500 font-semibold text-lg [text-shadow:0_0_0.5px_#2B7FFF]">
                    {part}
                  </span>
                ) : (
                  <BreadcrumbLink href={href} className="capitalize">
                    {part}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
