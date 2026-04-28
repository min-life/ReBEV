import { formatCurrency } from "../../utils/currency";

export const mapPackage = (item = {}) => ({
  id: item.id,
  name: item.name || "Gói chưa đặt tên",
  description: item.description || "Chưa có mô tả",
  price: formatCurrency(item.price),
  duration: item.duration ? `${item.duration} ngày` : "Chưa rõ",
  highlight: item.highlight || 0,
  top: item.top || 0,
  deleted: Boolean(item.is_deleted || item.deleted_at),
  raw: item,
});

export const mapCategory = (item = {}) => ({
  id: item.id,
  name: item.name || item.category_name || `Danh mục #${item.id}`,
  rate: item.rate ?? item.commission_rate ?? 0,
  raw: item,
});
