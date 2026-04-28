import DetailDrawer from "../../components/overlays/DetailDrawer";
import StatusBadge from "../../components/data-display/StatusBadge";
import { getStatusMeta, listingStatus } from "../../utils/status";

export default function ListingDetailDrawer({ listing, onClose, onApprove, onReject }) {
  const meta = listing ? getStatusMeta(listingStatus, listing.status) : null;

  return (
    <DetailDrawer
      open={Boolean(listing)}
      title="Chi tiết tin đăng"
      onClose={onClose}
      footer={
        listing && (
          <div className="flex justify-end gap-2">
            {(listing.status === 0 || listing.status === 1) && (
              <button type="button" className="h-10 rounded-2xl border border-rose-200 px-4 text-sm font-semibold text-rose-700" onClick={() => onReject(listing.id)}>
                Từ chối
              </button>
            )}
            {(listing.status === 0 || listing.status === 2) && (
              <button type="button" className="h-10 rounded-2xl bg-emerald-600 px-4 text-sm font-semibold text-white" onClick={() => onApprove(listing.id)}>
                Duyệt tin
              </button>
            )}
          </div>
        )
      }
    >
      {listing && (
        <div className="space-y-4">
          <div className="h-52 overflow-hidden rounded-[24px] bg-slate-100">
            {listing.image ? (
              <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-sm text-slate-400">Không có ảnh</div>
            )}
          </div>
          <div>
            <div className="mb-2 flex items-center gap-2">
              <StatusBadge label={meta.label} tone={meta.tone} />
              <span className="text-sm text-slate-500">{listing.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-950">{listing.title}</h3>
          </div>
          <dl className="grid gap-3 text-sm">
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-slate-500">Người bán</dt>
              <dd className="font-semibold text-slate-950">{listing.seller}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-slate-500">Giá</dt>
              <dd className="font-semibold text-slate-950">{listing.price}</dd>
            </div>
            <div className="rounded-2xl bg-slate-50 p-3">
              <dt className="text-slate-500">Ngày tạo</dt>
              <dd className="font-semibold text-slate-950">{listing.createdAt}</dd>
            </div>
          </dl>
        </div>
      )}
    </DetailDrawer>
  );
}
