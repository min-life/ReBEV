import { Inbox } from "lucide-react";

export default function EmptyState({ title = "Không có dữ liệu", description }) {
  return (
    <div className="grid min-h-56 place-items-center rounded-[24px] border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center">
      <div>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white text-slate-400 shadow-sm">
          <Inbox size={22} />
        </div>
        <p className="mt-4 font-semibold text-slate-900">{title}</p>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
    </div>
  );
}
