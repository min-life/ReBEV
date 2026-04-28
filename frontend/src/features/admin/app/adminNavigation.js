import {
  BadgeDollarSign,
  FileText,
  LayoutDashboard,
  ShoppingCart,
  Users,
} from "lucide-react";
import { ROUTES } from "@/constants/routes";

export const adminNavigation = [
  {
    id: "dashboard",
    label: "Báo cáo",
    description: "Sức khỏe hệ thống",
    to: ROUTES.ADMIN.DASHBOARD,
    icon: LayoutDashboard,
    adminOnly: true,
  },
  {
    id: "fees",
    label: "Phí hệ thống",
    description: "Phí sàn và gói",
    to: ROUTES.ADMIN.FEES,
    icon: BadgeDollarSign,
  },
  {
    id: "transactions",
    label: "Giao dịch",
    description: "Đơn, cọc, khiếu nại",
    to: ROUTES.ADMIN.TRANSACTIONS,
    icon: ShoppingCart,
  },
  {
    id: "listings",
    label: "Tin đăng",
    description: "Duyệt và kiểm soát",
    to: ROUTES.ADMIN.LISTINGS,
    icon: FileText,
  },
  {
    id: "users",
    label: "Người dùng",
    description: "Tài khoản và nhân sự",
    to: ROUTES.ADMIN.USERS,
    icon: Users,
  },
];
