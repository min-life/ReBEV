import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageHeader from "../../components/layout/PageHeader";
import FilterBar from "../../components/filters/FilterBar";
import ScrollPanel from "../../components/layout/ScrollPanel";
import AdminTable from "../../components/data-display/AdminTable";
import StatusBadge from "../../components/data-display/StatusBadge";
import LoadingState from "../../components/data-display/LoadingState";
import ErrorState from "../../components/data-display/ErrorState";
import Pagination from "../../components/pagination/Pagination";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import { usePagination } from "../../hooks/usePagination";
import { fetchPost, updatePostStatus } from "../../services/listingsApi";
import { toQueryString } from "../../utils/queryString";
import { getStatusMeta, listingStatus } from "../../utils/status";
import ListingDetailDrawer from "./ListingDetailDrawer";
import { mapListing } from "./listing.mappers";

export default function ListingsPage() {
  const pagination = usePagination(1, 5);
  const [filters, setFilters] = useState({ search: "", status: "", category: "" });
  const [selected, setSelected] = useState(null);
  const query = toQueryString({
    search: filters.search,
    status: filters.status,
    category_id: filters.category,
    page: pagination.page,
    limit: pagination.pageSize,
  });
  const { data, loading, error, refetch } = useAdminQuery(() => fetchPost(query), [query]);
  const listings = useMemo(() => (data?.data || []).map(mapListing), [data]);
  const total = data?.pagination?.total || listings.length;

  const updateStatus = async (id, status) => {
    try {
      await updatePostStatus(id, status);
      toast.success(status === 1 ? "Đã duyệt tin đăng." : "Đã từ chối tin đăng.");
      setSelected(null);
      refetch();
    } catch {
      toast.error("Không cập nhật được trạng thái tin đăng.");
    }
  };

  const columns = [
    {
      key: "title",
      header: "Tin đăng",
      cell: (row) => (
        <div className="flex min-w-[280px] items-center gap-3">
          <div className="h-12 w-16 overflow-hidden rounded-xl bg-slate-100">
            {row.image && <img src={row.image} alt={row.title} className="h-full w-full object-cover" />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-slate-950">{row.title}</p>
            <p className="text-xs text-slate-500">{row.category}</p>
          </div>
        </div>
      ),
    },
    { key: "seller", header: "Người bán" },
    { key: "price", header: "Giá" },
    { key: "status", header: "Trạng thái", cell: (row) => {
      const meta = getStatusMeta(listingStatus, row.status);
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    } },
    { key: "createdAt", header: "Ngày tạo" },
    { key: "actions", header: "", align: "right", cell: (row) => <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold" onClick={() => setSelected(row)}>Xem</button> },
  ];

  return (
    <div className="admin-page">
      <PageHeader title="Quản lý tin đăng" description="Duyệt tin, kiểm tra trạng thái và xử lý nội dung trước khi xuất hiện trên marketplace." />
      <FilterBar
        search={filters.search}
        onSearchChange={(search) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, search })); }}
        searchPlaceholder="Tìm theo tiêu đề tin đăng..."
        filters={[
          { key: "status", label: "Trạng thái", value: filters.status, onChange: (status) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, status })); }, options: [{ value: "", label: "Tất cả" }, { value: "0", label: "Chờ duyệt" }, { value: "1", label: "Đã duyệt" }, { value: "2", label: "Từ chối" }, { value: "3", label: "Đã bán" }] },
          { key: "category", label: "Danh mục", value: filters.category, onChange: (category) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, category })); }, options: [{ value: "", label: "Tất cả" }, { value: "1", label: "Xe máy điện" }, { value: "2", label: "Pin" }] },
        ]}
      />
      <ScrollPanel className="grid grid-rows-[minmax(0,1fr)_auto] gap-3">
        <div className="min-h-0">
          {error && <ErrorState error={error} onRetry={refetch} />}
          {loading ? <LoadingState /> : <AdminTable columns={columns} rows={listings} />}
        </div>
        <Pagination page={pagination.page} total={total} pageSize={pagination.pageSize} itemCount={listings.length} onPageChange={pagination.setPage} />
      </ScrollPanel>
      <ListingDetailDrawer listing={selected} onClose={() => setSelected(null)} onApprove={(id) => updateStatus(id, 1)} onReject={(id) => updateStatus(id, 2)} />
    </div>
  );
}
