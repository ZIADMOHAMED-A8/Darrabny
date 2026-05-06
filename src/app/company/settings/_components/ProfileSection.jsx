export default function ProfileSection({
  title,
  fields, // تأكد إن كل object هنا جواه readOnly خاص بيه
  onFieldChange,
  onEditClick, // فانكشن جديدة عشان تفتح الحقل اللي اتداس عليه بس
  onSubmit,
  isPending,
  serverError,
}) {
  return (
    <section className="w-full max-w-[1000px]">
      <h2 className="mb-8 text-[32px] font-bold text-[#1a2b4b] tracking-tight">{title}</h2>

      <div className="rounded-2xl border border-[#e5eaf2] bg-white p-10 shadow-sm">
        <h3 className="mb-10 text-[24px] font-bold text-[#1a2b4b]">
          Personal Information
        </h3>

        {/* تقسيم الجريد لمساحات متساوية تماماً */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col w-full">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-[14px] font-bold text-[#64748b] uppercase tracking-wider">
                  {field.label}
                </label>
                {/* نمرر الـ name عشان نفتح الحقل ده بس */}
                <button 
                  type="button"
                  onClick={() => onEditClick?.(field.name)}
                  className="text-[14px] font-bold text-[#3182ce] hover:text-[#2c5282] transition-colors"
                >
                  Edit
                </button>
              </div>

              {/* استخدام الـ Input وتوحيد الارتفاع إجباريًا */}
              <input
                type={field.type || "text"}
                value={field.value}
                readOnly={field.readOnly} // كل حقل مربوط بـ state لوحده
                onChange={(e) => onFieldChange?.(field.name, e.target.value)}
                // h-[52px] ثابتة و block عشان تملى المساحة
                className={`h-[52px] w-full block rounded-xl border border-[#dce4f0] px-4 text-[16px] text-[#1a2b4b] outline-none transition-all
                  ${field.readOnly 
                    ? "bg-[#f8fafc] cursor-not-allowed border-transparent" 
                    : "bg-white border-[#3182ce] ring-2 ring-blue-50 shadow-sm"
                  }`}
                placeholder={`Enter ${field.label}`}
              />
            </div>
          ))}
        </div>

        {serverError && (
          <p className="mt-8 text-sm font-semibold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
            ⚠️ {String(serverError?.message || "Error updating settings")}
          </p>
        )}

        <div className="mt-12 flex justify-end border-t border-gray-50 pt-8">
          <button
            type="button"
            onClick={onSubmit}
            disabled={isPending}
            className="h-[52px] min-w-[160px] rounded-xl bg-[#0070f3] px-10 text-[16px] font-bold text-white transition-all hover:bg-[#0060d0] active:scale-95 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg shadow-blue-200/50"
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </section>
  );
}