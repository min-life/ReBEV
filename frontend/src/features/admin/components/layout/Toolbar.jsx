export default function Toolbar({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-[24px] border border-slate-200 bg-white/85 p-3 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
