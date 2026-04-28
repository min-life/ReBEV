import { useState } from "react";

export default function UserCreateStaffDialog({ open, onClose, onCreate }) {
  const [form, setForm] = useState({ email: "", phone: "" });
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/45 p-4">
      <form
        className="w-full max-w-md rounded-[28px] bg-white p-5 shadow-2xl"
        onSubmit={(event) => {
          event.preventDefault();
          onCreate(form);
        }}
      >
        <h2 className="text-lg font-semibold text-slate-950">Tạo tài khoản nhân viên</h2>
        <div className="mt-5 space-y-3">
          <input
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            placeholder="Email"
            className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500"
          />
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder="Số điện thoại"
            className="h-11 w-full rounded-2xl border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="h-10 rounded-2xl border border-slate-200 px-4 text-sm font-semibold" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="h-10 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white">
            Tạo nhân viên
          </button>
        </div>
      </form>
    </div>
  );
}
