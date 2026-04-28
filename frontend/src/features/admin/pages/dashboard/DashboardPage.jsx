import { useMemo, useState } from "react";
import { BadgeDollarSign, BarChart3, FileText, TrendingUp, Users } from "lucide-react";
import PageHeader from "../../components/layout/PageHeader";
import ScrollPanel from "../../components/layout/ScrollPanel";
import MetricCard from "../../components/data-display/MetricCard";
import LoadingState from "../../components/data-display/LoadingState";
import ErrorState from "../../components/data-display/ErrorState";
import { useAdminQuery } from "../../hooks/useAdminQuery";
import { getStaticPage } from "../../services/dashboardApi";
import { formatCurrency, formatNumber } from "../../utils/currency";
import { mapStats } from "./dashboard.mappers";

const years = Array.from({ length: new Date().getFullYear() - 2024 + 1 }, (_, index) => 2024 + index);

function MiniBars({ data = [] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-52 items-end gap-2 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
      {Array.from({ length: 12 }).map((_, index) => {
        const value = data[index] || 0;
        return (
          <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-xl bg-slate-950"
              style={{ height: `${Math.max(8, (value / max) * 180)}px` }}
              title={formatNumber(value)}
            />
            <span className="text-[10px] text-slate-400">{index + 1}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const { data, loading, error, refetch } = useAdminQuery(() => getStaticPage(year), [year]);
  const stats = useMemo(() => mapStats(data?.data || {}), [data]);

  return (
    <div className="admin-page-single">
      <PageHeader
        title="Báo cáo & thống kê"
        description="Theo dõi sức khỏe marketplace, doanh thu và khối lượng giao dịch trong một màn hình vận hành."
        meta={
          <select
            value={year}
            onChange={(event) => setYear(event.target.value)}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none"
          >
            {years.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        }
      />

      <ScrollPanel className="space-y-4">
        {error && <ErrorState error={error} onRetry={refetch} />}
        {loading ? (
          <LoadingState rows={6} />
        ) : (
          <>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <MetricCard title="Người dùng" value={formatNumber(stats.users)} icon={Users} />
              <MetricCard title="Tin đăng" value={formatNumber(stats.posts)} icon={FileText} />
              <MetricCard title="Giao dịch" value={formatNumber(stats.transactions)} icon={TrendingUp} />
              <MetricCard title="Doanh thu hệ thống" value={formatCurrency(stats.revenueSystem)} icon={BadgeDollarSign} />
              <MetricCard title="Doanh thu doanh nghiệp" value={formatCurrency(stats.revenueOffice)} icon={BarChart3} />
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="font-semibold text-slate-950">Doanh thu theo tháng</h2>
                <p className="mb-4 text-sm text-slate-500">Đơn vị VND trong năm {year}</p>
                <MiniBars data={stats.monthlyRevenue} />
              </section>
              <section className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
                <h2 className="font-semibold text-slate-950">Giao dịch theo tháng</h2>
                <p className="mb-4 text-sm text-slate-500">Số lượng giao dịch phát sinh</p>
                <MiniBars data={stats.monthlyTransactions} />
              </section>
            </div>
          </>
        )}
      </ScrollPanel>
    </div>
  );
}
