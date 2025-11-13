export function CRMBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -right-28 top-12 hidden rotate-6 rounded-[32px] border border-white/20 bg-white/15 p-6 text-sm text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:block">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          CRM • Painel médico
        </p>
        <h4 className="mt-2 text-2xl font-semibold">Fluxo de pacientes</h4>

        <div className="mt-4 space-y-3">
          {["Check-in", "Sala de exames", "Pagamento"].map((stage) => (
            <div
              key={stage}
              className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-widest text-white/60">
                {stage}
              </p>
              <p className="text-lg font-semibold">
                {stage === "Check-in"
                  ? "12 pacientes"
                  : stage === "Sala de exames"
                    ? "08 em andamento"
                    : "5 pendentes"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

