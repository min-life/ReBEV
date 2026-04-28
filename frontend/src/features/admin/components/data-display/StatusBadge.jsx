const toneClass = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  danger: "bg-rose-50 text-rose-700 ring-rose-100",
  warning: "bg-amber-50 text-amber-700 ring-amber-100",
  info: "bg-sky-50 text-sky-700 ring-sky-100",
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
};

export default function StatusBadge({ label, tone = "neutral" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1",
        toneClass[tone] || toneClass.neutral,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
