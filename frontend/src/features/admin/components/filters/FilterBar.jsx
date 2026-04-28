import { SlidersHorizontal } from "lucide-react";
import Toolbar from "../layout/Toolbar";
import SearchField from "./SearchField";
import SelectFilter from "./SelectFilter";

export default function FilterBar({ search, onSearchChange, searchPlaceholder, filters = [], action }) {
  return (
    <Toolbar>
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <SearchField
          value={search}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        <div className="flex flex-wrap items-center gap-2">
          {filters.length > 0 && (
            <div className="hidden h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600 sm:flex">
              <SlidersHorizontal size={16} />
              Bộ lọc
            </div>
          )}
          {filters.map((filter) => (
            <SelectFilter key={filter.key} {...filter} />
          ))}
          {action}
        </div>
      </div>
    </Toolbar>
  );
}
