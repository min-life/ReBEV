import { Search } from "lucide-react";

export default function SearchField({ value, onChange, placeholder = "Tìm kiếm..." }) {
  return (
    <label className="relative block min-w-[240px] flex-1">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}
