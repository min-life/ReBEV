import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import PageHeader from "../../components/layout/PageHeader";
import FilterBar from "../../components/filters/FilterBar";
import ScrollPanel from "../../components/layout/ScrollPanel";
import AdminTable from "../../components/data-display/AdminTable";
import StatusBadge from "../../components/data-display/StatusBadge";
import LoadingState from "../../components/data-display/LoadingState";
import ErrorState from "../../components/data-display/ErrorState";
import Pagination from "../../components/pagination/Pagination";
import ConfirmActionDialog from "../../components/actions/ConfirmActionDialog";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import { usePagination } from "../../hooks/usePagination";
import { createStaffAccount, fetchUsers, lockUserAccount, unLockUserAccount } from "../../services/usersApi";
import { toQueryString } from "../../utils/queryString";
import { mapUser } from "./user.mappers";
import UserCreateStaffDialog from "./UserCreateStaffDialog";

export default function UsersPage() {
  const pagination = usePagination(1, 10);
  const [filters, setFilters] = useState({ search: "", hasPackage: "", isLocked: "" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmUser, setConfirmUser] = useState(null);

  const query = toQueryString({
    search: filters.search,
    hasPackage: filters.hasPackage,
    isLocked: filters.isLocked,
    page: pagination.page,
    limit: pagination.pageSize,
  });
  const { data, setData, loading, error, refetch } = useAdminQuery(() => fetchUsers(query), [query]);
  const users = useMemo(() => (data?.users || []).map(mapUser), [data]);
  const total = data?.total || users.length;

  const columns = [
    { key: "name", header: "Người dùng", cell: (row) => <div><p className="font-semibold text-slate-950">{row.name}</p><p className="text-xs text-slate-500">{row.email}</p></div> },
    { key: "phone", header: "Điện thoại" },
    { key: "roleLabel", header: "Vai trò", cell: (row) => <StatusBadge label={row.roleLabel} tone={row.role === 2 ? "neutral" : "info"} /> },
    { key: "status", header: "Trạng thái", cell: (row) => <StatusBadge label={row.locked ? "Bị khóa" : "Hoạt động"} tone={row.locked ? "danger" : "success"} /> },
    { key: "createdAt", header: "Ngày tạo" },
    {
      key: "actions",
      header: "",
      align: "right",
      cell: (row) => row.role !== 2 && (
        <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold" onClick={() => setConfirmUser(row)}>
          {row.locked ? "Mở khóa" : "Khóa"}
        </button>
      ),
    },
  ];

  return (
    <div className="admin-page">
      <PageHeader
        title="Quản lý người dùng"
        description="Kiểm soát tài khoản, trạng thái khóa và tạo tài khoản nhân viên cho đội vận hành."
        action={
          <button type="button" className="inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white" onClick={() => setDialogOpen(true)}>
            <Plus size={16} /> Tạo nhân viên
          </button>
        }
      />
      <FilterBar
        search={filters.search}
        onSearchChange={(search) => {
          pagination.resetPage();
          setFilters((prev) => ({ ...prev, search }));
        }}
        searchPlaceholder="Tìm tên, email hoặc số điện thoại..."
        filters={[
          { key: "hasPackage", label: "Gói", value: filters.hasPackage, onChange: (hasPackage) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, hasPackage })); }, options: [{ value: "", label: "Tất cả" }, { value: "true", label: "Đã có gói" }, { value: "false", label: "Chưa có gói" }] },
          { key: "isLocked", label: "Trạng thái", value: filters.isLocked, onChange: (isLocked) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, isLocked })); }, options: [{ value: "", label: "Tất cả" }, { value: "false", label: "Hoạt động" }, { value: "true", label: "Bị khóa" }] },
        ]}
      />
      <ScrollPanel className="grid grid-rows-[minmax(0,1fr)_auto] gap-3">
        <div className="min-h-0">
          {error && <ErrorState error={error} onRetry={refetch} />}
          {loading ? <LoadingState /> : <AdminTable columns={columns} rows={users} />}
        </div>
        <Pagination page={pagination.page} total={total} pageSize={pagination.pageSize} itemCount={users.length} onPageChange={pagination.setPage} />
      </ScrollPanel>
      <UserCreateStaffDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onCreate={async (staff) => {
          try {
            const created = await createStaffAccount(staff);
            setData((prev) => ({ ...prev, users: [created?.user, ...(prev?.users || [])].filter(Boolean) }));
            setDialogOpen(false);
            toast.success("Đã tạo tài khoản nhân viên.");
          } catch (err) {
            toast.error(err?.response?.data?.message || "Không tạo được nhân viên.");
          }
        }}
      />
      <ConfirmActionDialog
        open={Boolean(confirmUser)}
        title={confirmUser?.locked ? "Mở khóa tài khoản?" : "Khóa tài khoản?"}
        description={confirmUser ? `Tài khoản: ${confirmUser.name}` : ""}
        danger={!confirmUser?.locked}
        confirmLabel={confirmUser?.locked ? "Mở khóa" : "Khóa"}
        onCancel={() => setConfirmUser(null)}
        onConfirm={async () => {
          try {
            if (confirmUser.locked) await unLockUserAccount(confirmUser.id);
            else await lockUserAccount(confirmUser.id);
            setConfirmUser(null);
            refetch();
          } catch {
            toast.error("Thao tác thất bại.");
          }
        }}
      />
    </div>
  );
}
