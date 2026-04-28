export default function PageSection({ children, className = "" }) {
  return (
    <section
      className={[
        "rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </section>
  );
}
