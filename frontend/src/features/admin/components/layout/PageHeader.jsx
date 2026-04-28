export default function PageHeader({ eyebrow = "Admin console", title, description, action, meta }) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white/85 p-5 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            {eyebrow}
          </p>
          <h1 className="truncate text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {meta}
          {action}
        </div>
      </div>
    </section>
  );
}
