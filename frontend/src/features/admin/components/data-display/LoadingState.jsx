export default function LoadingState({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-16 animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
        />
      ))}
    </div>
  );
}
