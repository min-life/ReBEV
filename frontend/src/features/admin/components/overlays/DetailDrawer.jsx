import { X } from "lucide-react";

export default function DetailDrawer({ open, title, children, onClose, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/35">
      <aside className="ml-auto grid h-full w-[min(520px,100vw)] grid-rows-[auto_minmax(0,1fr)_auto] bg-white shadow-2xl">
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl border border-slate-200"
            onClick={onClose}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </header>
        <div className="min-h-0 overflow-auto p-5">{children}</div>
        {footer && <footer className="border-t border-slate-200 p-4">{footer}</footer>}
      </aside>
    </div>
  );
}
