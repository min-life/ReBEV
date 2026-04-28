import { formatCurrency } from "../../utils/currency";
import { formatDateTime } from "../../utils/date";

export const mapOrder = (order = {}) => ({
  id: order.id || order.order_id,
  code: `#${order.id || order.order_id || "N/A"}`,
  seller: order.seller?.display_name || order.seller_name || order.user?.display_name || "Không rõ",
  buyer: order.buyer?.display_name || order.buyer_name || "Không rõ",
  amount: formatCurrency(order.total_price || order.total || order.amount || order.transaction_sum),
  status: order.order_status || order.status || "PENDING",
  createdAt: formatDateTime(order.create_at || order.created_at),
  raw: order,
});

export const mapComplaint = (complaint = {}) => ({
  id: complaint.id,
  code: `#${complaint.id || "N/A"}`,
  seller: complaint.seller?.display_name || complaint.order?.seller?.display_name || "Không rõ",
  buyer: complaint.user?.display_name || complaint.customer?.display_name || "Không rõ",
  amount: complaint.order?.total_price ? formatCurrency(complaint.order.total_price) : "Không rõ",
  status: String(complaint.status ?? complaint.complaint_status ?? 0),
  createdAt: formatDateTime(complaint.create_at || complaint.created_at),
  reason: complaint.reason || complaint.description || "Chưa có mô tả",
  raw: complaint,
});
