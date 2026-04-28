export const listingStatus = {
  0: { label: "Chờ duyệt", tone: "warning" },
  1: { label: "Đã duyệt", tone: "success" },
  2: { label: "Từ chối", tone: "danger" },
  3: { label: "Đã bán", tone: "info" },
  4: { label: "Đã đặt cọc", tone: "info" },
  5: { label: "Đã hủy", tone: "neutral" },
  6: { label: "Đã xác minh", tone: "success" },
  7: { label: "Đang giao dịch", tone: "info" },
};

export const orderStatus = {
  PENDING: { label: "Đang chờ", tone: "warning" },
  PAID: { label: "Đã thanh toán", tone: "success" },
  CONFIRMED: { label: "Đã xác nhận", tone: "info" },
  DELIVERING: { label: "Đang giao", tone: "info" },
  DELIVERED: { label: "Đã giao", tone: "success" },
  COMPLETED: { label: "Hoàn thành", tone: "success" },
  CANCELLED: { label: "Đã hủy", tone: "neutral" },
  FAIL_PAY: { label: "Thanh toán thất bại", tone: "danger" },
  CUSTOMER_CANCELLED: { label: "Người mua hủy", tone: "neutral" },
  SELLER_CANCELLED: { label: "Người bán hủy", tone: "neutral" },
  RETURNING: { label: "Đang hoàn trả", tone: "info" },
  RETURNED: { label: "Đã hoàn trả", tone: "success" },
};

export const complaintStatus = {
  0: { label: "Đang xử lý", tone: "warning" },
  1: { label: "Chấp nhận", tone: "success" },
  2: { label: "Từ chối", tone: "danger" },
  3: { label: "Hủy", tone: "neutral" },
};

export const roleLabel = {
  0: "Người dùng",
  1: "Nhân viên",
  2: "Quản trị viên",
};

export const getStatusMeta = (map, value) =>
  map?.[value] || { label: value || "Không rõ", tone: "neutral" };
