// components/diplomas/diploma-cards-list.tsx
"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import DiplomaCard from "@/components/diplomas/diploma-card";
import { useMemo, useEffect, useRef } from "react";

// fetchDiplomas و slugify زي ما هم عندك…
async function fetchDiplomas({
  pageParam = 1,
  limit = 6,
}: {
  pageParam?: number;
  limit?: number;
}) {
  const res = await fetch(
    `https://exam-app-back-iota.vercel.app/diplomas?page=${pageParam}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch diplomas");
  return res.json();
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "")
    .replace(/\-+/g, "-")
    .replace(/^\-+|\-+$/g, "");
}

export default function DiplomaCardsList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
  queryKey: ["diplomas"],
  queryFn: ({ pageParam }) =>
    fetchDiplomas({ pageParam: pageParam as number, limit: 6 }),
  getNextPageParam: (lastPage) => {
    const { metadata } = lastPage;
    return metadata.currentPage < metadata.numberOfPages
      ? metadata.currentPage + 1
      : undefined;
  },
  initialPageParam: 1,

  staleTime: Infinity,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,

  gcTime: 30 * 24 * 60 * 60 * 1000, // 30 يوم

  retry: 1,
});


  const diplomas = useMemo(
    () => data?.pages.flatMap((page) => page.subjects) ?? [],
    [data]
  );

  // ---- Infinite scroll via IntersectionObserver ----
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // قفل بسيط يمنع التريجر المتكرر أثناء الفetch
  const lockRef = useRef(false);

  useEffect(() => {
    if (!hasNextPage) return; // مفيش صفحات تانية
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first.isIntersecting) return;

        // امنع التكرار لو فيه طلب شغال أو اللّوك مقفول
        if (isFetchingNextPage || lockRef.current) return;

        lockRef.current = true; // اقفل لحد ما يبدأ الفetch
        fetchNextPage().finally(() => {
          // افتح القفل بعد استقرار الـtask في الماكروتاستك التالي
          // لتفادي تكرار التريجر على نفس الإطار
          setTimeout(() => {
            lockRef.current = false;
          }, 0);
        });
      },
      {
        root: null,
        // تحميل تحضيري قبل الوصول للآخر فعليًا (يحسن الإحساس بالسرعة)
        rootMargin: "600px 0px",
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (status === "pending") return <div>جاري التحميل...</div>;
  if (status === "error") return <div>حدث خطأ: {error.message}</div>;

  return (
    <>
      {diplomas.map((d: Diploma) => {
        const slug = slugify(d.name);
        const href = `/${slug}-${d._id}/exams`;
        return (
          <DiplomaCard key={d._id} title={d.name} img={d.icon} href={href} />
        );
      })}

      {/* الـsentinel: عنصر غير مرئي في آخر الليست */}
      {hasNextPage && (
        <div
          ref={sentinelRef}
          aria-hidden="true"
          className="h-1 w-full"
        />
      )}

      {/* حالة تحميل الصفحة التالية */}
      {isFetchingNextPage && (
        <div className="mt-6 text-center text-sm text-gray-500">
          جاري التحميل...
        </div>
      )}
    </>
  );
}
