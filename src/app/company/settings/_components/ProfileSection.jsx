export default function ProfileSection({ title, fields }) {
  return (
    <section>
      <h2 className="text-[34px] font-extrabold text-[#0f1b33]">{title}</h2>

      <div className="mt-5 rounded-2xl border border-[#d8dfec] bg-white px-5 py-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        <h3 className="text-[34px] font-extrabold text-[#0f1b33]">Personal Information</h3>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-medium text-slate-500">{field.label}</label>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#0d6db6] hover:text-[#0b5f9f]"
                >
                  Edit
                </button>
              </div>

              <input
                type={field.type || "text"}
                value={field.value}
                readOnly
                className="h-11 w-full rounded-md border border-[#d6dbe7] bg-[#f7f8fc] px-3 text-sm text-slate-600 placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
