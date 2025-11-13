import { useMemo } from "react";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone } from "../../utils/formatters";

const paymentActions = [
  { label: "Enviar pagamento", description: "Disparo por SMS/WhatsApp" },
  { label: "Registrar baixa manual", description: "Confirmar recebimento" },
];

const scheduleActions = [
  { label: "Lembrete de retorno", description: "Notificar paciente • Novo" },
  { label: "Alterar horário", description: "Ajustar agenda do médico" },
  { label: "Receber sala agora", description: "Liberar paciente para sala" },
  { label: "Alterar paciente", description: "Transferir atendimento" },
  { label: "Reagendar", description: "Remarcar com confirmação" },
];

type ControlSidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function ControlSidebar({ collapsed, onToggle }: ControlSidebarProps) {
  const { selectedPatient, supportPhone, addChatMessage } = usePatients();

  const patient = useMemo(
    () =>
      selectedPatient ?? {
        nomeCompleto: "Paciente não selecionado",
        medico: "Equipe",
        especialidade: "Clínica geral",
      },
    [selectedPatient],
  );

  const handleAction = (label: string) => {
    addChatMessage(
      "assistant",
      `Ação executada no painel: ${label}. Equipe notificada.`,
    );
  };

  return (
    <aside
      className={`rounded-[24px] border border-brand-mist/40 bg-white text-brand-dark shadow-lg transition-all duration-300 ${
        collapsed
          ? "max-h-16 w-full px-3 py-3 lg:max-h-none lg:w-16"
          : "w-full px-5 py-5 lg:w-80"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="mb-4 flex items-center justify-center rounded-full border border-brand-mist/40 bg-white p-3 text-xl font-bold text-brand-marine shadow-sm hover:bg-brand-sand/80"
        aria-label={collapsed ? "Abrir menu" : "Recolher menu"}
      >
        {collapsed ? "☰" : "×"}
      </button>

      {!collapsed && (
        <div className="flex-1 space-y-6 overflow-y-auto pr-1">
          <section className="rounded-2xl border border-brand-mist/40 bg-brand-sand/50 p-4">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/70">
              Paciente
            </p>
            <h3 className="mt-2 text-xl font-bold text-brand-dark">
              {patient.nomeCompleto}
            </h3>
            <p className="text-sm text-brand-dark/70">
              {patient.medico ? `Dra. ${patient.medico}` : "Equipe"} •{" "}
              {patient.especialidade}
            </p>
            {supportPhone && (
              <p className="mt-2 text-xs text-brand-marine/80">
                Contato: {formatPhone(supportPhone)}
              </p>
            )}
          </section>

          <section className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/70">
              Pagamentos
            </p>
            {paymentActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => handleAction(action.label)}
                className="w-full rounded-2xl border border-brand-mist/50 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-brand-sand/60"
              >
                <p className="text-sm font-semibold text-brand-dark">
                  {action.label}
                </p>
                <p className="text-xs text-brand-dark/60">
                  {action.description}
                </p>
              </button>
            ))}
          </section>

          <section className="space-y-3">
            <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/70">
              Agendamentos
            </p>
            {scheduleActions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => handleAction(action.label)}
                className="w-full rounded-2xl border border-brand-mist/50 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-brand-sand/60"
              >
                <p className="text-sm font-semibold text-brand-dark">
                  {action.label}
                </p>
                <p className="text-xs text-brand-dark/60">
                  {action.description}
                </p>
              </button>
            ))}
          </section>
        </div>
      )}
    </aside>
  );
}
