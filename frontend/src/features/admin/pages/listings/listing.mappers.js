import { formatCurrency } from "../../utils/currency";
import { formatDateTime } from "../../utils/date";

export const parseListingImage = (media) => {
  try {
    const items = JSON.parse(media || "[]");
    const source = items.find((item) => item.is_thumbnail)?.url || items[0]?.url || "";
    return source?.split(" ")[1] || source || "";
  } catch {
    return "";
  }
};

export const mapListing = (listing = {}) => ({
  id: listing.id,
  title: listing.title || "Tin đăng chưa có tiêu đề",
  seller: listing?.user?.display_name || "Không rõ",
  category: Number(listing.category_id) === 1 ? "Xe máy điện" : "Pin xe máy điện",
  price: formatCurrency(listing.price),
  status: Number(listing.status),
  createdAt: formatDateTime(listing.create_at),
  image: parseListingImage(listing.media),
  raw: listing,
});
