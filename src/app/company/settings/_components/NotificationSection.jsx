function Toggle({ enabled, onClick, disabled }) {
  return (
    <button
      type="button"
      aria-pressed={enabled}
      onClick={onClick}
      disabled={disabled}
      className={[
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-70",
        enabled ? "bg-[#2e8de1]" : "bg-[#d2d7e2]",
      ].join(" ")}
    >
      <span
        className={[
          "h-5 w-5 rounded-full bg-white shadow transition-transform",
          enabled ? "translate-x-5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  );
}

export default function NotificationSection({
  title,
  notifications,
  onToggle,
  isPending,
  serverError,
}) {
  return (
    <section className="mt-7">
      <h3 className="text-[34px] font-extrabold text-[#0f1b33]">{title}</h3>

      <div className="mt-4 rounded-2xl border border-[#d8dfec] bg-white px-4 py-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
        {notifications.map((item, index) => (
          <div
            key={item.key}
            className={[
              "flex items-center justify-between gap-6 px-2 py-4",
              index !== notifications.length - 1
                ? "border-b border-[#d8dfec]"
                : "",
            ].join(" ")}
          >
            <div>
              <p className="text-[17px] font-semibold text-[#1e293b]">
                {item.label}
              </p>
              <p className="mt-1 text-sm text-slate-500">{item.description}</p>
            </div>

            <Toggle
              enabled={item.enabled}
              onClick={() => onToggle?.(item.key)}
              disabled={isPending}
            />
          </div>
        ))}
      </div>

      {serverError ? (
        <p className="mt-3 text-sm text-red-600">
          {String(serverError?.message || "Failed to update notifications")}
        </p>
      ) : null}
    </section>
  );
}
