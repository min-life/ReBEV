export default function ScrollPanel({ children, className = "" }) {
  return (
    <div className={["admin-scroll-area rounded-[28px]", className].join(" ")}>
      {children}
    </div>
  );
}
