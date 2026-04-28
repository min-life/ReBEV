import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./../styles/tokens.css";
import AdminMobileNav from "./AdminMobileNav";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-shell">
      <div className="admin-layout" data-collapsed={collapsed}>
        <AdminSidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
        />
        <div className="admin-main">
          <AdminTopbar onMobileMenu={() => setMobileOpen(true)} />
          <main className="admin-workspace">
            <Outlet />
          </main>
        </div>
      </div>
      <AdminMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}
