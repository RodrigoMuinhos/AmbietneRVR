import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { usePatients } from "../context/PatientsContext";
import { ExperienceShell } from "../components/layout/ExperienceShell";
const primaryActions = [
    {
        label: "Acabei de chegar!",
        description: "Check-in guiado • foto e alerta ao time",
        path: "/totem/checkin/letra",
    },
];
export function MenuPage() {
    const navigate = useNavigate();
    const { resetAll } = usePatients();
    const goTo = (path) => {
        resetAll();
        navigate(path);
    };
    const exitToLanding = () => {
        resetAll();
        navigate("/");
    };
    return (_jsx(ExperienceShell, { showSidebar: false, showBackdrop: false, children: _jsxs("div", { className: "relative rounded-[32px] border border-brand-mist/50 bg-white px-8 py-10 text-brand-dark shadow-md lg:px-14", children: [_jsx("button", { type: "button", onClick: exitToLanding, className: "absolute right-4 top-4 h-4 w-4 rounded-full border border-brand-mist/40 bg-brand-sand/80 opacity-20 transition hover:opacity-80 focus:opacity-80 focus:outline-none", title: "Voltar para a escolha inicial", children: _jsx("span", { className: "sr-only", children: "Sair do totem" }) }), _jsxs("header", { className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { type: "button", onClick: () => navigate("/"), className: "rounded-full border border-brand-mist/40 bg-white p-3 text-brand-marine shadow-sm hover:bg-brand-sand/80", title: "Voltar para o menu inicial", children: _jsx("span", { className: "inline-block text-xl leading-none", children: "\u2302" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.6em] text-brand-marine/70", children: "Totem" }), _jsx("h1", { className: "text-5xl font-black tracking-tight", children: "Totem de orienta\u00E7\u00E3o" }), _jsx("p", { className: "mt-3 text-lg text-brand-dark/70", children: "Escolha como deseja continuar seu atendimento. Simples, r\u00E1pido e direto no totem." })] })] }), _jsxs("div", { className: "rounded-3xl bg-brand-sand/80 px-6 py-4 text-sm font-semibold text-brand-marine/80", children: ["Totem 03 \u00B7 Recep\u00E7\u00E3o principal", _jsx("span", { className: "ml-2 inline-flex items-center text-green-500", children: "\u25CF Dispon\u00EDvel" })] })] }), _jsx("div", { className: "mt-8 grid gap-6", children: primaryActions.map((action) => (_jsxs("div", { className: "rounded-[28px] border border-brand-sand bg-brand-sand/70 p-6", children: [_jsx("h2", { className: "text-3xl font-black text-brand-marine", children: action.label }), _jsx("p", { className: "mt-2 text-sm text-brand-dark/70", children: action.description }), _jsx(Button, { className: "mt-6", onClick: () => goTo(action.path), children: "Iniciar" })] }, action.label))) }), _jsxs("section", { className: "mt-10 rounded-[28px] border border-brand-sand bg-white px-6 py-6", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.5em] text-brand-marine", children: "Passo a passo" }), _jsx("ol", { className: "mt-4 grid gap-4 text-sm text-brand-dark/80 md:grid-cols-2", children: [
                                "1. Escolha a primeira letra do nome ou informe telefone.",
                                "2. Confirme médico, especialidade e sua identidade.",
                                "3. Faça o check-in com foto e vá para a sala indicada.",
                                "4. Simule o pagamento e acompanhe pelo painel.",
                            ].map((item) => (_jsx("li", { className: "rounded-full border border-brand-mist/40 px-4 py-2", children: item }, item))) }), _jsx("p", { className: "mt-4 text-sm text-brand-dark/70", children: "Ap\u00F3s registrar a foto, o pr\u00F3prio totem apresentar\u00E1 a etapa de pagamento. N\u00E3o \u00E9 necess\u00E1rio escolher essa op\u00E7\u00E3o agora." })] })] }) }));
}
