import DetailDrawer from "../../components/overlays/DetailDrawer";
import StatusBadge from "../../components/data-display/StatusBadge";
import { complaintStatus, getStatusMeta, orderStatus } from "../../utils/status";

export default function OrderDetailDrawer({ item, complaint, onClose }) {
  const meta = item ? getStatusMeta(complaint ? complaintStatus : orderStatus, item.status) : null;

  return (
    <DetailDrawer open={Boolean(item)} title={complaint ? "Chi tiết khiếu nại" : "Chi tiết giao dịch"} onClose={onClose}>
      {item && (
        <div className="space-y-3">
          <div className="rounded-[24px] bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-950">{item.code}</p>
              <StatusBadge label={meta.label} tone={meta.tone} />
            </div>
            <p className="text-sm text-slate-500">Ngày tạo: {item.createdAt}</p>
          </div>
          <div className="grid gap-3 text-sm">
            <div className="rounded-2xl border border-slate-200 p-3">
              <p className="text-slate-500">Người mua</p>
              <p className="font-semibold text-slate-950">{item.buyer}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-3">
              <p className="text-slate-500">Người bán</p>
              <p className="font-semibold text-slate-950">{item.seller}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-3">
              <p className="text-slate-500">Giá trị</p>
              <p className="font-semibold text-slate-950">{item.amount}</p>
            </div>
            {complaint && (
              <div className="rounded-2xl border border-slate-200 p-3">
                <p className="text-slate-500">Nội dung</p>
                <p className="font-semibold text-slate-950">{item.reason}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </DetailDrawer>
  );
}
