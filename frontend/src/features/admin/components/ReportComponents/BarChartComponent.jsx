export default function BarChartComponent({ data = [], title = "", year, monthly }) {
  const max = Math.max(...data.map((item) => Number(item || 0)), 1);

  return (
    <div className="h-full min-h-64 rounded-[24px] border border-slate-200 bg-white p-4">
      {(title || year) && (
        <div className="mb-4">
          <h3 className="font-semibold text-slate-950">
            {title} {year ? `(${year})` : ""}
          </h3>
        </div>
      )}
      <div className="flex h-[calc(100%-48px)] min-h-48 items-end gap-2">
        {Array.from({ length: 12 }).map((_, index) => {
          const value = Number(data[index] || 0);
          return (
            <div key={index} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-t-xl bg-slate-950"
                style={{ height: `${Math.max(8, (value / max) * 180)}px` }}
                title={monthly ? `${value.toLocaleString("vi-VN")} VND` : `${value} giao dịch`}
              />
              <span className="text-[10px] text-slate-400">{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
