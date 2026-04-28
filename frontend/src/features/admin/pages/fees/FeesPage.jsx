import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageHeader from "../../components/layout/PageHeader";
import ScrollPanel from "../../components/layout/ScrollPanel";
import Toolbar from "../../components/layout/Toolbar";
import AdminTable from "../../components/data-display/AdminTable";
import LoadingState from "../../components/data-display/LoadingState";
import ErrorState from "../../components/data-display/ErrorState";
import StatusBadge from "../../components/data-display/StatusBadge";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import { getCategory, getFullPackage, updateCategory } from "../../services/feesApi";
import { mapCategory, mapPackage } from "./fee.mappers";

export default function FeesPage() {
  const [tab, setTab] = useState(window.location.pathname.includes("/package") ? "packages" : "platform");
  const packagesQuery = useAdminQuery(getFullPackage, []);
  const categoriesQuery = useAdminQuery(getCategory, []);
  const packages = useMemo(() => (packagesQuery.data || []).map(mapPackage), [packagesQuery.data]);
  const categories = useMemo(() => (categoriesQuery.data || []).map(mapCategory), [categoriesQuery.data]);

  const packageColumns = [
    { key: "name", header: "Gói", cell: (row) => <div><p className="font-semibold text-slate-950">{row.name}</p><p className="text-xs text-slate-500">{row.description}</p></div> },
    { key: "price", header: "Giá" },
    { key: "duration", header: "Thời hạn" },
    { key: "highlight", header: "Nổi bật" },
    { key: "top", header: "Top" },
    { key: "status", header: "Trạng thái", cell: (row) => <StatusBadge label={row.deleted ? "Đã xóa" : "Đang bán"} tone={row.deleted ? "neutral" : "success"} /> },
  ];

  const categoryColumns = [
    { key: "name", header: "Danh mục" },
    { key: "rate", header: "Phí hiện tại", cell: (row) => `${row.rate}%` },
    { key: "actions", header: "", align: "right", cell: (row) => (
      <button
        type="button"
        className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold"
        onClick={async () => {
          const raw = window.prompt(`Nhập phí mới cho ${row.name}`, row.rate);
          if (raw === null) return;
          try {
            await updateCategory(row.id, Number(raw));
            toast.success("Đã cập nhật phí sàn.");
            categoriesQuery.refetch();
          } catch {
            toast.error("Không cập nhật được phí sàn.");
          }
        }}
      >
        Sửa phí
      </button>
    ) },
  ];

  const loading = tab === "packages" ? packagesQuery.loading : categoriesQuery.loading;
  const error = tab === "packages" ? packagesQuery.error : categoriesQuery.error;
  const refetch = tab === "packages" ? packagesQuery.refetch : categoriesQuery.refetch;

  return (
    <div className="admin-page">
      <PageHeader title="Quản lý phí hệ thống" description="Cấu hình phí sàn, gói thành viên và các mức thu liên quan đến marketplace." />
      <Toolbar>
        <div className="flex gap-2">
          <button type="button" className={`h-11 rounded-2xl px-4 text-sm font-semibold ${tab === "platform" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setTab("platform")}>
            Phí sàn
          </button>
          <button type="button" className={`h-11 rounded-2xl px-4 text-sm font-semibold ${tab === "packages" ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`} onClick={() => setTab("packages")}>
            Gói người dùng
          </button>
        </div>
      </Toolbar>
      <ScrollPanel>
        {error && <ErrorState error={error} onRetry={refetch} />}
        {loading ? <LoadingState /> : <AdminTable columns={tab === "packages" ? packageColumns : categoryColumns} rows={tab === "packages" ? packages : categories} />}
      </ScrollPanel>
    </div>
  );
}
