import { AlertTriangle } from "lucide-react";

const getMessage = (error, fallback) =>
  error?.response?.data?.error ||
  error?.response?.data?.message ||
  error?.message ||
  fallback;

export default function ErrorState({ message = "Không tải được dữ liệu.", error, onRetry }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
      <span className="flex items-center gap-2 font-medium">
        <AlertTriangle size={17} />
        {getMessage(error, message)}
      </span>
      {onRetry && (
        <button type="button" className="font-semibold underline" onClick={onRetry}>
          Thử lại
        </button>
      )}
    </div>
  );
}
