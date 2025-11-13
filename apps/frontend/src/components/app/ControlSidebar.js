import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export function ControlSidebar({ collapsed, onToggle }) {
    const { selectedPatient, supportPhone, addChatMessage } = usePatients();
    const patient = useMemo(() => selectedPatient ?? {
        nomeCompleto: "Paciente não selecionado",
        medico: "Equipe",
        especialidade: "Clínica geral",
    }, [selectedPatient]);
    const handleAction = (label) => {
        addChatMessage("assistant", `Ação executada no painel: ${label}. Equipe notificada.`);
    };
    return (_jsxs("aside", { className: `rounded-[24px] border border-brand-mist/40 bg-white text-brand-dark shadow-lg transition-all duration-300 ${collapsed
            ? "max-h-16 w-full px-3 py-3 lg:max-h-none lg:w-16"
            : "w-full px-5 py-5 lg:w-80"}`, children: [_jsx("button", { type: "button", onClick: onToggle, className: "mb-4 flex items-center justify-center rounded-full border border-brand-mist/40 bg-white p-3 text-xl font-bold text-brand-marine shadow-sm hover:bg-brand-sand/80", "aria-label": collapsed ? "Abrir menu" : "Recolher menu", children: collapsed ? "☰" : "×" }), !collapsed && (_jsxs("div", { className: "flex-1 space-y-6 overflow-y-auto pr-1", children: [_jsxs("section", { className: "rounded-2xl border border-brand-mist/40 bg-brand-sand/50 p-4", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/70", children: "Paciente" }), _jsx("h3", { className: "mt-2 text-xl font-bold text-brand-dark", children: patient.nomeCompleto }), _jsxs("p", { className: "text-sm text-brand-dark/70", children: [patient.medico ? `Dra. ${patient.medico}` : "Equipe", " \u2022", " ", patient.especialidade] }), supportPhone && (_jsxs("p", { className: "mt-2 text-xs text-brand-marine/80", children: ["Contato: ", formatPhone(supportPhone)] }))] }), _jsxs("section", { className: "space-y-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/70", children: "Pagamentos" }), paymentActions.map((action) => (_jsxs("button", { type: "button", onClick: () => handleAction(action.label), className: "w-full rounded-2xl border border-brand-mist/50 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-brand-sand/60", children: [_jsx("p", { className: "text-sm font-semibold text-brand-dark", children: action.label }), _jsx("p", { className: "text-xs text-brand-dark/60", children: action.description })] }, action.label)))] }), _jsxs("section", { className: "space-y-3", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/70", children: "Agendamentos" }), scheduleActions.map((action) => (_jsxs("button", { type: "button", onClick: () => handleAction(action.label), className: "w-full rounded-2xl border border-brand-mist/50 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-brand-sand/60", children: [_jsx("p", { className: "text-sm font-semibold text-brand-dark", children: action.label }), _jsx("p", { className: "text-xs text-brand-dark/60", children: action.description })] }, action.label)))] })] }))] }));
}
