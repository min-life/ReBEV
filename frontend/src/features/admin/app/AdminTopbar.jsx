import { Bell, Menu, Search, ShieldCheck } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function AdminTopbar({ onMobileMenu }) {
  const { user } = useUser();

  return (
    <header className="flex min-h-16 items-center gap-3 border-b border-slate-200 bg-white/75 px-4 backdrop-blur-xl">
      <button
        type="button"
        className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden"
        onClick={onMobileMenu}
        aria-label="Mở menu"
      >
        <Menu size={20} />
      </button>

      <div className="hidden min-w-0 max-w-xl flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
        <Search size={17} className="shrink-0 text-slate-400" />
        <span className="truncate text-sm text-slate-500">
          Tìm nhanh người dùng, tin đăng hoặc mã giao dịch
        </span>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 sm:flex">
          <ShieldCheck size={16} />
          {user?.role === 2 ? "Quản trị viên" : "Nhân viên"}
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-600 hover:text-slate-950"
          aria-label="Thông báo"
        >
          <Bell size={18} />
        </button>
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
          {(user?.display_name || user?.email || "A").slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
}
