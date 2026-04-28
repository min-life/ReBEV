import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { adminNavigation } from "./adminNavigation";

export default function AdminMobileNav({ open, onClose }) {
  const { user } = useUser();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 lg:hidden">
      <div className="h-full w-[min(340px,86vw)] bg-[#10160f] p-4 text-white shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-semibold">ReBEV Admin</p>
            <p className="text-xs text-slate-400">Điều hướng vận hành</p>
          </div>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10"
            onClick={onClose}
            aria-label="Đóng menu"
          >
            <X size={18} />
          </button>
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
                  onClick={onClose}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-2xl px-3 py-3",
                      isActive ? "bg-white text-slate-950" : "text-slate-300",
                    ].join(" ")
                  }
                >
                  <Icon size={19} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </NavLink>
              );
            })}
        </div>
      </div>
    </div>
  );
}
