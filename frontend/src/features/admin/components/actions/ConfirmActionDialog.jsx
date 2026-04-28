export default function ConfirmActionDialog({ open, title, description, confirmLabel = "Xác nhận", onCancel, onConfirm, danger }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-slate-950/45 p-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-5 shadow-2xl">
        <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
        {description && <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="h-10 rounded-2xl border border-slate-200 px-4 text-sm font-semibold" onClick={onCancel}>
            Hủy
          </button>
          <button
            type="button"
            className={[
              "h-10 rounded-2xl px-4 text-sm font-semibold text-white",
              danger ? "bg-rose-600 hover:bg-rose-700" : "bg-slate-950 hover:bg-emerald-700",
            ].join(" ")}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
