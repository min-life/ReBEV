import { ChevronLeft, ChevronRight, LogOut, Zap } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { adminNavigation } from "./adminNavigation";

export default function AdminSidebar({ collapsed, onToggle }) {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  return (
    <aside className="hidden min-h-0 border-r border-black/10 bg-[#10160f] text-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-emerald-400 text-slate-950">
            <Zap size={20} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">ReBEV Admin</p>
              <p className="truncate text-xs text-slate-400">
                {user?.role === 2 ? "Toàn quyền vận hành" : "Nhân viên"}
              </p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="grid h-8 w-8 place-items-center rounded-xl border border-white/10 text-slate-300 hover:bg-white/10"
          aria-label={collapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="min-h-0 flex-1 overflow-y-auto p-3">
        <div className={collapsed ? "sr-only" : "mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500"}>
          Điều hướng
        </div>
        <div className="space-y-1.5">
          {adminNavigation
            .filter((item) => !item.adminOnly || user?.role === 2)
            .map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.to}
                  end={item.id === "dashboard"}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-2xl px-3 py-3 transition",
                      collapsed ? "justify-center" : "",
                      isActive
                        ? "bg-white text-slate-950 shadow-lg"
                        : "text-slate-300 hover:bg-white/10 hover:text-white",
                    ].join(" ")
                  }
                >
                  <Icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold">{item.label}</span>
                      <span className="block truncate text-xs text-current/55">
                        {item.description}
                      </span>
                    </span>
                  )}
                </NavLink>
              );
            })}
        </div>
      </nav>

      <div className="border-t border-white/10 p-3">
        {!collapsed && (
          <div className="mb-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
            <p className="truncate text-sm font-semibold">
              {user?.display_name || user?.email || "Admin"}
            </p>
            <p className="truncate text-xs text-slate-400">{user?.email || "Đang đăng nhập"}</p>
          </div>
        )}
        <button
          type="button"
          className={[
            "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-slate-300 hover:bg-rose-500/10 hover:text-rose-100",
            collapsed ? "justify-center" : "",
          ].join(" ")}
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={19} />
          {!collapsed && <span className="text-sm font-semibold">Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
