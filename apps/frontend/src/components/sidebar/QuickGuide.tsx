const steps = [
  {
    title: "1. Chegada",
    detail: "Selecione a letra ou informe telefone.",
  },
  {
    title: "2. Confirmação",
    detail: "Valide médico, especialidade e tire a foto.",
  },
  {
    title: "3. Pagamento",
    detail: "Escolha método, parcelas e aguarde o totem.",
  },
  {
    title: "4. CRM",
    detail: "Equipe acompanha tudo pelo painel principal.",
  },
];

export function QuickGuide() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/80 p-5 shadow-lg">
      <header>
        <p className="text-xs uppercase tracking-[0.3em] text-brand-marine">
          Guia prático
        </p>
        <h3 className="text-lg font-semibold text-brand-dark">
          Como o totem orienta o paciente
        </h3>
      </header>

      <ol className="mt-4 space-y-3 text-sm">
        {steps.map((step) => (
          <li
            key={step.title}
            className="rounded-2xl bg-brand-sand/60 px-3 py-3"
          >
            <p className="font-semibold text-brand-marine">{step.title}</p>
            <p className="text-xs text-brand-dark/70">{step.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

