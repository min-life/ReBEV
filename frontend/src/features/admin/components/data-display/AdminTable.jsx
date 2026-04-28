import EmptyState from "./EmptyState";

export default function AdminTable({ columns, rows, getRowKey = (row) => row.id }) {
  if (!rows?.length) {
    return <EmptyState description="Thử đổi bộ lọc hoặc làm mới dữ liệu." />;
  }

  return (
    <div className="min-h-0 overflow-auto rounded-[24px] border border-slate-200">
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead className="sticky top-0 z-[1] bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="border-b border-slate-200 px-4 py-3 font-semibold"
                style={{ width: column.width }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="group hover:bg-slate-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={[
                    "border-b border-slate-100 px-4 py-3 align-middle",
                    column.align === "right" ? "text-right" : "",
                  ].join(" ")}
                >
                  {column.cell ? column.cell(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
