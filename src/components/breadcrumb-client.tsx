"use client";

import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type Crumb = { label: string; href?: string };

export default function BreadcrumbClient({ items }: { items: Crumb[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, i) => {
          const isFirst = i === 0;
          const isLast = i === items.length - 1;

          return (
            <span key={`${item.label}-${i}`} className="inline-flex items-center">
              {!isFirst && (
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              )}

              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <span className="capitalize">{item.label}</span>
                ) : (
                  <BreadcrumbLink href={item.href} className="capitalize">
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
