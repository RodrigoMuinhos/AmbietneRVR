import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientsContext";
import { ControlSidebar } from "../components/app/ControlSidebar";

export function MonitorAppPage() {
  const { patients, selectedPatient } = usePatients();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const pendingCheckin = patients.filter(
    (patient) => patient.statusCheckin === "pendente",
  ).length;
  const completedCheckin = patients.filter(
    (patient) => patient.statusCheckin === "feito",
  ).length;
  const pendingPayment = patients.filter(
    (patient) => patient.statusPagamento === "pendente",
  ).length;
  const paid = patients.filter(
    (patient) => patient.statusPagamento === "pago",
  ).length;

  const highlightedPatient = useMemo(
    () =>
      selectedPatient ??
      patients.find((patient) => patient.statusCheckin === "pendente"),
    [selectedPatient, patients],
  );

  const cards = [
    {
      title: "Consultas do dia",
      value: pendingCheckin + completedCheckin,
      detail: `${completedCheckin} já confirmadas`,
    },
    {
      title: "Agendamentos remarcados",
      value: Math.max(2, Math.floor(pendingCheckin / 2)),
      detail: "Revisões feitas pelo concierge",
    },
    {
      title: "Pagamentos concluídos",
      value: paid,
      detail: `${pendingPayment} aguardando recebimento`,
    },
  ];

  const timeline = [
    {
      time: "10:32",
      title: "Totem registrou chegada",
      detail: highlightedPatient
        ? highlightedPatient.nomeCompleto
        : "Paciente aguardando",
    },
    {
      time: "10:35",
      title: "Equipe confirmou médico",
      detail: highlightedPatient
        ? `Dra. ${highlightedPatient.medico}`
        : "Sem seleção",
    },
    {
      time: "10:41",
      title: "Pagamento autorizado",
      detail: paid ? `${paid} pacientes pagos` : "Aguardando",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-6 text-brand-dark lg:px-10 lg:py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row">
        <ControlSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed((state) => !state)}
        />

        <div className="flex-1 rounded-[32px] border border-brand-mist/40 bg-white px-6 py-6 text-brand-dark shadow-xl lg:px-10 lg:py-8">
          <header className="flex flex-col gap-4 border-b border-brand-mist/40 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-full border border-brand-mist/40 bg-white p-2 text-brand-marine shadow-sm hover:bg-brand-sand/70"
                title="Voltar para a tela de seleção"
              >
                <span className="inline-block text-2xl leading-none">⌂</span>
              </button>
              <div>
                <p className="text-xs uppercase tracking-[0.6em] text-brand-marine/70">
                  CRM Horizon • Monitoramento
                </p>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  Operação em tempo real
                </h1>
                <p className="mt-2 text-sm text-brand-dark/70">
                  Consulta, agendamento e recebimento acompanhados minuto a
                  minuto.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-brand-sand/70 px-5 py-3 text-sm font-semibold text-brand-marine">
              Totem sincronizado <span className="text-green-500">●</span>
            </div>
          </header>

          <main className="mt-8 space-y-8">
            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-3xl border border-brand-mist/60 bg-brand-sand/60 p-5 text-center shadow-sm"
                >
                  <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/80">
                    {card.title}
                  </p>
                  <p className="mt-3 text-3xl font-black text-brand-marine">
                    {card.value}
                  </p>
                  <p className="text-sm text-brand-dark/70">{card.detail}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="rounded-[24px] border border-brand-mist/50 bg-white/90 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/80">
                  Paciente em evidência
                </p>
                {highlightedPatient ? (
                  <>
                    <h2 className="mt-3 text-2xl font-black text-brand-dark">
                      {highlightedPatient.nomeCompleto}
                    </h2>
                    <p className="text-sm text-brand-dark/70">
                      Dra. {highlightedPatient.medico} •{" "}
                      {highlightedPatient.especialidade}
                    </p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-2xl bg-brand-sand/80 px-4 py-3 text-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
                          Check-in
                        </p>
                        <p className="text-lg font-semibold text-brand-dark">
                          {highlightedPatient.statusCheckin}
                        </p>
                      </div>
                      <div className="rounded-2xl bg-brand-mist/40 px-4 py-3 text-sm">
                        <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
                          Recebimento
                        </p>
                        <p className="text-lg font-semibold text-brand-dark">
                          {highlightedPatient.statusPagamento}
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="mt-4 text-brand-dark/70">
                    Nenhum paciente selecionado no totem neste momento.
                  </p>
                )}
              </div>

              <div className="rounded-[24px] border border-brand-mist/50 bg-white/90 p-5 shadow-sm">
                <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/80">
                  Linha do tempo
                </p>
                <ul className="mt-4 space-y-4 text-sm">
                  {timeline.map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-semibold text-brand-marine">
                          {item.time}
                        </span>
                        <span className="my-1 h-8 w-0.5 bg-brand-mist/80" />
                      </div>
                      <div className="flex-1 rounded-2xl bg-brand-sand/70 px-4 py-3">
                        <p className="text-sm font-semibold text-brand-dark">
                          {item.title}
                        </p>
                        <p className="text-xs text-brand-dark/70">{item.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </main>

          <footer className="mt-8 flex flex-col gap-3 border-t border-brand-mist/40 pt-6 text-sm text-brand-dark/70 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Última sincronização{" "}
              <strong>
                {new Date().toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </strong>
            </p>
            <div className="flex gap-3 text-xs uppercase tracking-[0.3em] text-brand-marine">
              <span>Consultas</span>
              <span>Agendamentos</span>
              <span>Recebimentos</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
