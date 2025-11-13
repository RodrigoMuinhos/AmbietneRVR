const services = [
  {
    icon: "🩺",
    title: "Consultas presenciais",
    detail: "13 pacientes aguardando",
    accent: "bg-brand-sun/20 text-brand-sun",
  },
  {
    icon: "💉",
    title: "Centro de vacinação",
    detail: "Aplicação em sala 02",
    accent: "bg-brand-sky/20 text-brand-sky",
  },
  {
    icon: "🧪",
    title: "Coleta laboratorial",
    detail: "Resultados às 17h",
    accent: "bg-brand-mist/30 text-brand-marine",
  },
  {
    icon: "💬",
    title: "Teleatendimento",
    detail: "CRM envia alertas em tempo real",
    accent: "bg-brand-marine/20 text-brand-marine",
  },
];

export function ClinicMenu() {
  return (
    <section className="rounded-3xl border border-white/50 bg-white/80 p-5 shadow-lg">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-marine">
            Na clínica hoje
          </p>
          <h3 className="text-lg font-semibold text-brand-dark">
            Operações ativas
          </h3>
        </div>
        <span className="rounded-full bg-brand-sand px-3 py-1 text-xs font-semibold text-brand-marine">
          CRM Live
        </span>
      </header>

      <ul className="mt-4 space-y-3 text-sm">
        {services.map((service) => (
          <li
            key={service.title}
            className="flex items-start gap-3 rounded-2xl bg-white/80 px-3 py-3"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-2xl text-xl ${service.accent}`}
            >
              {service.icon}
            </span>
            <div>
              <p className="font-semibold text-brand-dark">{service.title}</p>
              <p className="text-xs text-brand-marine/80">{service.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

