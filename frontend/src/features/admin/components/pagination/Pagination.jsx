import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, total = 1, pageSize = 10, itemCount = 0, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(Number(total || 1) / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages || itemCount >= pageSize;

  return (
    <div className="flex items-center justify-between gap-3 rounded-[22px] border border-slate-200 bg-white px-3 py-2 text-sm">
      <span className="text-slate-500">
        Trang <strong className="text-slate-900">{page}</strong> / {totalPages}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => canPrev && onPageChange(page - 1)}
          className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Trang trước"
        >
          <ChevronLeft size={17} />
        </button>
        <button
          type="button"
          disabled={!canNext}
          onClick={() => canNext && onPageChange(page + 1)}
          className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200 disabled:cursor-not-allowed disabled:opacity-45"
          aria-label="Trang sau"
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}
