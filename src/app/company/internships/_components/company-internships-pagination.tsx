"use client";

type PaginationItem = number | "ellipsis";

type Props = {
  page: number;
  totalPages: number;
  isLoading?: boolean;
  onPageChange: (nextPage: number) => void;
};

export default function CompanyInternshipsPagination({
  page,
  totalPages,
  isLoading,
  onPageChange,
}: Props) {
  const items = buildPaginationItems(page, totalPages);

  return (
    <div className="mt-12 flex items-center justify-center gap-2 text-sm text-white/80">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1 || isLoading}
        className="px-3 py-2 rounded-md hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        &lt; Previous
      </button>

      <div className="flex items-center gap-1">
        {items.map((item, index) =>
          item === "ellipsis" ? (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={item}
              onClick={() => onPageChange(item)}
              disabled={item === page || isLoading}
              className={[
                "h-9 w-9 rounded-md",
                item === page
                  ? "bg-black/40 text-white"
                  : "hover:bg-white/10",
                "disabled:cursor-not-allowed disabled:opacity-60",
              ].join(" ")}
            >
              {item}
            </button>
          )
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages || isLoading}
        className="px-3 py-2 rounded-md hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next &gt;
      </button>
    </div>
  );
}

function buildPaginationItems(
  currentPage: number,
  totalPages: number
): PaginationItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items: PaginationItem[] = [];
  const addPage = (page: number) => items.push(page);
  const addEllipsis = () => items.push("ellipsis");

  addPage(1);

  if (currentPage > 3) {
    addEllipsis();
  }

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i += 1) {
    addPage(i);
  }

  if (currentPage < totalPages - 2) {
    addEllipsis();
  }

  addPage(totalPages);

  return items;
}
