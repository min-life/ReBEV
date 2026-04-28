import { formatDate } from "../../utils/date";
import { roleLabel } from "../../utils/status";

export const mapUser = (user = {}) => ({
  id: user.id,
  name: user.display_name || user.name || "Chưa có tên",
  email: user.email || "Chưa có email",
  phone: user.phone || "Chưa có số điện thoại",
  role: user.role,
  roleLabel: roleLabel[user.role] || "Không rõ",
  locked: Boolean(user.is_locked),
  packageId: user.package_id,
  createdAt: formatDate(user.create_at),
  raw: user,
});
