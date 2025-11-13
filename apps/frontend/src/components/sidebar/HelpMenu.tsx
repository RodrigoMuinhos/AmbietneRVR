const shortcuts = [
  { label: "Manual rápido", action: "Abrir PDF", accent: "bg-brand-sky/20" },
  { label: "Chamar concierge", action: "Totens 03/04", accent: "bg-brand-sun/20" },
  { label: "Notificar suporte", action: "Equipe Tech", accent: "bg-brand-marine/20" },
];

export function HelpMenu() {
  return (
    <section className="rounded-3xl border border-white/60 bg-white/85 p-5 shadow-lg">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-marine">
            Menu de auxílio
          </p>
          <h3 className="text-lg font-semibold text-brand-dark">
            Precisa de ajuda?
          </h3>
        </div>
        <span className="text-xs font-semibold text-brand-marine/70">
          <span className="text-green-500">●</span> equipe online
        </span>
      </header>

      <div className="mt-4 flex flex-col gap-3 text-sm">
        {shortcuts.map((shortcut) => (
          <button
            key={shortcut.label}
            type="button"
            className={`flex items-center justify-between rounded-2xl border border-white/80 px-4 py-3 text-left font-semibold text-brand-dark transition hover:translate-x-1 ${shortcut.accent}`}
          >
            <span>{shortcut.label}</span>
            <span className="text-xs font-normal text-brand-marine/80">
              {shortcut.action}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

