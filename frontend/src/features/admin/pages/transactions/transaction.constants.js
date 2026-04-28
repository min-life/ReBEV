export const transactionTabs = [
  { id: "purchase-orders", label: "Đơn mua", orderType: 1 },
  { id: "deposit-orders", label: "Đơn đặt cọc", orderType: 2 },
  { id: "complaint-orders", label: "Khiếu nại", complaint: true },
  { id: "return-orders", label: "Trả hàng", orderType: 3 },
];

export const orderStatusOptions = [
  { value: "", label: "Tất cả" },
  { value: "PENDING", label: "Đang chờ" },
  { value: "PAID", label: "Đã thanh toán" },
  { value: "CONFIRMED", label: "Đã xác nhận" },
  { value: "DELIVERING", label: "Đang giao" },
  { value: "DELIVERED", label: "Đã giao" },
  { value: "COMPLETED", label: "Hoàn thành" },
  { value: "CANCELLED", label: "Đã hủy" },
  { value: "FAIL_PAY", label: "Thanh toán thất bại" },
  { value: "RETURNING", label: "Đang hoàn trả" },
  { value: "RETURNED", label: "Đã hoàn trả" },
];

export const complaintStatusOptions = [
  { value: "", label: "Tất cả" },
  { value: "0", label: "Đang xử lý" },
  { value: "1", label: "Chấp nhận" },
  { value: "2", label: "Từ chối" },
  { value: "3", label: "Hủy" },
];
