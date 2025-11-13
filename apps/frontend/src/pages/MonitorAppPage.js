import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatients } from "../context/PatientsContext";
import { ControlSidebar } from "../components/app/ControlSidebar";
export function MonitorAppPage() {
    const { patients, selectedPatient } = usePatients();
    const navigate = useNavigate();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    const pendingCheckin = patients.filter((patient) => patient.statusCheckin === "pendente").length;
    const completedCheckin = patients.filter((patient) => patient.statusCheckin === "feito").length;
    const pendingPayment = patients.filter((patient) => patient.statusPagamento === "pendente").length;
    const paid = patients.filter((patient) => patient.statusPagamento === "pago").length;
    const highlightedPatient = useMemo(() => selectedPatient ??
        patients.find((patient) => patient.statusCheckin === "pendente"), [selectedPatient, patients]);
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
    return (_jsx("div", { className: "min-h-screen bg-white px-4 py-6 text-brand-dark lg:px-10 lg:py-8", children: _jsxs("div", { className: "mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row", children: [_jsx(ControlSidebar, { collapsed: sidebarCollapsed, onToggle: () => setSidebarCollapsed((state) => !state) }), _jsxs("div", { className: "flex-1 rounded-[32px] border border-brand-mist/40 bg-white px-6 py-6 text-brand-dark shadow-xl lg:px-10 lg:py-8", children: [_jsxs("header", { className: "flex flex-col gap-4 border-b border-brand-mist/40 pb-6 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", onClick: () => navigate("/"), className: "rounded-full border border-brand-mist/40 bg-white p-2 text-brand-marine shadow-sm hover:bg-brand-sand/70", title: "Voltar para a tela de sele\u00E7\u00E3o", children: _jsx("span", { className: "inline-block text-2xl leading-none", children: "\u2302" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.6em] text-brand-marine/70", children: "CRM Horizon \u2022 Monitoramento" }), _jsx("h1", { className: "text-3xl font-black tracking-tight sm:text-4xl", children: "Opera\u00E7\u00E3o em tempo real" }), _jsx("p", { className: "mt-2 text-sm text-brand-dark/70", children: "Consulta, agendamento e recebimento acompanhados minuto a minuto." })] })] }), _jsxs("div", { className: "rounded-3xl bg-brand-sand/70 px-5 py-3 text-sm font-semibold text-brand-marine", children: ["Totem sincronizado ", _jsx("span", { className: "text-green-500", children: "\u25CF" })] })] }), _jsxs("main", { className: "mt-8 space-y-8", children: [_jsx("section", { className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: cards.map((card) => (_jsxs("div", { className: "rounded-3xl border border-brand-mist/60 bg-brand-sand/60 p-5 text-center shadow-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/80", children: card.title }), _jsx("p", { className: "mt-3 text-3xl font-black text-brand-marine", children: card.value }), _jsx("p", { className: "text-sm text-brand-dark/70", children: card.detail })] }, card.title))) }), _jsxs("section", { className: "grid gap-6 lg:grid-cols-2", children: [_jsxs("div", { className: "rounded-[24px] border border-brand-mist/50 bg-white/90 p-5 shadow-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/80", children: "Paciente em evid\u00EAncia" }), highlightedPatient ? (_jsxs(_Fragment, { children: [_jsx("h2", { className: "mt-3 text-2xl font-black text-brand-dark", children: highlightedPatient.nomeCompleto }), _jsxs("p", { className: "text-sm text-brand-dark/70", children: ["Dra. ", highlightedPatient.medico, " \u2022", " ", highlightedPatient.especialidade] }), _jsxs("div", { className: "mt-5 grid gap-4 sm:grid-cols-2", children: [_jsxs("div", { className: "rounded-2xl bg-brand-sand/80 px-4 py-3 text-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine/70", children: "Check-in" }), _jsx("p", { className: "text-lg font-semibold text-brand-dark", children: highlightedPatient.statusCheckin })] }), _jsxs("div", { className: "rounded-2xl bg-brand-mist/40 px-4 py-3 text-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine/70", children: "Recebimento" }), _jsx("p", { className: "text-lg font-semibold text-brand-dark", children: highlightedPatient.statusPagamento })] })] })] })) : (_jsx("p", { className: "mt-4 text-brand-dark/70", children: "Nenhum paciente selecionado no totem neste momento." }))] }), _jsxs("div", { className: "rounded-[24px] border border-brand-mist/50 bg-white/90 p-5 shadow-sm", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/80", children: "Linha do tempo" }), _jsx("ul", { className: "mt-4 space-y-4 text-sm", children: timeline.map((item) => (_jsxs("li", { className: "flex gap-3", children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("span", { className: "text-xs font-semibold text-brand-marine", children: item.time }), _jsx("span", { className: "my-1 h-8 w-0.5 bg-brand-mist/80" })] }), _jsxs("div", { className: "flex-1 rounded-2xl bg-brand-sand/70 px-4 py-3", children: [_jsx("p", { className: "text-sm font-semibold text-brand-dark", children: item.title }), _jsx("p", { className: "text-xs text-brand-dark/70", children: item.detail })] })] }, item.title))) })] })] })] }), _jsxs("footer", { className: "mt-8 flex flex-col gap-3 border-t border-brand-mist/40 pt-6 text-sm text-brand-dark/70 sm:flex-row sm:items-center sm:justify-between", children: [_jsxs("p", { children: ["\u00DAltima sincroniza\u00E7\u00E3o", " ", _jsx("strong", { children: new Date().toLocaleTimeString("pt-BR", {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }) })] }), _jsxs("div", { className: "flex gap-3 text-xs uppercase tracking-[0.3em] text-brand-marine", children: [_jsx("span", { children: "Consultas" }), _jsx("span", { children: "Agendamentos" }), _jsx("span", { children: "Recebimentos" })] })] })] })] }) }));
}
