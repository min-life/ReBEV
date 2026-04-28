import { useMemo, useState } from "react";
import PageHeader from "../../components/layout/PageHeader";
import FilterBar from "../../components/filters/FilterBar";
import ScrollPanel from "../../components/layout/ScrollPanel";
import Toolbar from "../../components/layout/Toolbar";
import AdminTable from "../../components/data-display/AdminTable";
import StatusBadge from "../../components/data-display/StatusBadge";
import LoadingState from "../../components/data-display/LoadingState";
import ErrorState from "../../components/data-display/ErrorState";
import Pagination from "../../components/pagination/Pagination";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import { usePagination } from "../../hooks/usePagination";
import { getComplaints, getOrders } from "../../services/transactionsApi";
import { toQueryString } from "../../utils/queryString";
import { complaintStatus, getStatusMeta, orderStatus } from "../../utils/status";
import { complaintStatusOptions, orderStatusOptions, transactionTabs } from "./transaction.constants";
import { mapComplaint, mapOrder } from "./transaction.mappers";
import OrderDetailDrawer from "./OrderDetailDrawer";

const getInitialTab = () => {
  const path = window.location.pathname;
  return transactionTabs.find((tab) => path.includes(tab.id))?.id || "purchase-orders";
};

export default function TransactionsPage() {
  const pagination = usePagination(1, 5);
  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [filters, setFilters] = useState({ search: "", status: "" });
  const [selected, setSelected] = useState(null);
  const tab = transactionTabs.find((item) => item.id === activeTab) || transactionTabs[0];
  const query = tab.complaint
    ? toQueryString({ id: filters.search, status: filters.status, page: pagination.page, limit: pagination.pageSize })
    : `&order_id=${filters.search}&order_status=${filters.status}&page=${pagination.page}&limit=${pagination.pageSize}`;
  const { data, loading, error, refetch } = useAdminQuery(
    () => (tab.complaint ? getComplaints(query) : getOrders(tab.orderType, query)),
    [activeTab, query]
  );
  const rows = useMemo(() => {
    if (tab.complaint) return (data?.complaints || []).map(mapComplaint);
    return (data?.orders || []).map(mapOrder);
  }, [data, tab.complaint]);
  const total = data?.pagination?.total || rows.length;

  const columns = [
    { key: "code", header: "Mã" },
    { key: "buyer", header: "Người mua" },
    { key: "seller", header: "Người bán" },
    { key: "amount", header: "Giá trị" },
    { key: "status", header: "Trạng thái", cell: (row) => {
      const meta = getStatusMeta(tab.complaint ? complaintStatus : orderStatus, row.status);
      return <StatusBadge label={meta.label} tone={meta.tone} />;
    } },
    { key: "createdAt", header: "Ngày tạo" },
    { key: "actions", header: "", align: "right", cell: (row) => <button type="button" className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold" onClick={() => setSelected(row)}>Xem</button> },
  ];

  return (
    <div className="admin-page">
      <PageHeader title="Quản lý giao dịch" description="Theo dõi đơn mua, đặt cọc, khiếu nại và trả hàng trong một workspace." />
      <div className="space-y-3">
        <Toolbar>
          <div className="flex flex-wrap gap-2">
            {transactionTabs.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`h-10 rounded-2xl px-4 text-sm font-semibold ${activeTab === item.id ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-700"}`}
                onClick={() => {
                  pagination.resetPage();
                  setSelected(null);
                  setFilters({ search: "", status: "" });
                  setActiveTab(item.id);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </Toolbar>
        <FilterBar
          search={filters.search}
          onSearchChange={(search) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, search })); }}
          searchPlaceholder={tab.complaint ? "Tìm mã khiếu nại..." : "Tìm mã đơn..."}
          filters={[{ key: "status", label: "Trạng thái", value: filters.status, onChange: (status) => { pagination.resetPage(); setFilters((prev) => ({ ...prev, status })); }, options: tab.complaint ? complaintStatusOptions : orderStatusOptions }]}
        />
      </div>
      <ScrollPanel className="grid grid-rows-[minmax(0,1fr)_auto] gap-3">
        <div className="min-h-0">
          {error && <ErrorState error={error} onRetry={refetch} />}
          {loading ? <LoadingState /> : <AdminTable columns={columns} rows={rows} />}
        </div>
        <Pagination page={pagination.page} total={total} pageSize={pagination.pageSize} itemCount={rows.length} onPageChange={pagination.setPage} />
      </ScrollPanel>
      <OrderDetailDrawer item={selected} complaint={tab.complaint} onClose={() => setSelected(null)} />
    </div>
  );
}
