"use client";

import { useMemo, useState, type ReactNode } from "react";
import { BriefcaseBusiness, CheckCircle2, FileText } from "lucide-react";
import StudentFooter from "@/components/shared/student-footer";
import {
  DUMMY_NOTIFICATIONS,
  type NotificationItem,
} from "./_data/notifications.dummy";

const iconByType: Record<NotificationItem["type"], ReactNode> = {
  application: <FileText className="h-5 w-5 text-[#1594d8]" />,
  opportunity: <BriefcaseBusiness className="h-5 w-5 text-[#5fb6df]" />,
  report: <CheckCircle2 className="h-5 w-5 text-[#57b894]" />,
};

export default function NotificationsPage() {
  const [items, setItems] = useState(DUMMY_NOTIFICATIONS);

  const unreadCount = useMemo(
    () => items.filter((item) => !item.isRead).length,
    [items],
  );

  function markAllRead() {
    setItems((prev) => prev.map((item) => ({ ...item, isRead: true })));
  }

  return (
    <div className="relative">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-0 md:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0b1f33] sm:text-4xl">
            Notifications
          </h1>
          <button
            type="button"
            onClick={markAllRead}
            disabled={unreadCount === 0}
            className="text-sm font-semibold text-[#0f6e9f] disabled:cursor-not-allowed disabled:text-[#0f6e9f]/40"
          >
            Mark all as read
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#0b1f33]/10 bg-white shadow-[0_20px_50px_rgba(16,24,40,0.08)]">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex items-start gap-3 border-b border-[#0b1f33]/10 px-4 py-5 last:border-b-0 sm:gap-4 sm:px-6"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#f2f7fd]">
                {iconByType[item.type]}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold leading-6 text-[#0b1f33] sm:text-xl">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm text-[#0b1f33]/70">{item.message}</p>
                <p className="mt-2 text-sm text-[#0b1f33]/45">{item.timeAgo}</p>
              </div>

              {!item.isRead && (
                <span
                  className="mt-4 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#2385f5]"
                  aria-label="Unread notification"
                />
              )}
            </article>
          ))}
        </div>

        <StudentFooter />
      </div>
    </div>
  );
}
