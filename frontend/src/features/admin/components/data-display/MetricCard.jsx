export default function MetricCard({ title, value, icon: Icon, helper }) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 truncate text-2xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
        </div>
        {Icon && (
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
            <Icon size={20} />
          </div>
        )}
      </div>
      {helper && <p className="mt-3 text-xs text-slate-500">{helper}</p>}
    </div>
  );
}
