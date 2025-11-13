import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ExperienceShell } from "../components/layout/ExperienceShell";
const screens = [
    {
        id: "totem",
        title: "Ver Totem",
        description: "Simule o fluxo físico do paciente: check-in, foto e pagamento direto no totem.",
        highlight: "Recepção · Totem 03",
        path: "/totem",
    },
    {
        id: "app",
        title: "Ver App",
        description: "Acompanhe o CRM da equipe com alertas do totem, filas e confirmações em tempo real.",
        highlight: "Backoffice · CRM Horizon",
        path: "/app",
    },
];
export function LandingPage() {
    const navigate = useNavigate();
    return (_jsx(ExperienceShell, { background: "sand", showSidebar: false, showBackdrop: false, children: _jsxs("div", { className: "rounded-[32px] border border-brand-mist/40 bg-white px-8 py-12 text-brand-dark shadow-lg lg:px-14", children: [_jsxs("header", { className: "text-center", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.6em] text-brand-marine/70", children: "Ambiente demonstrativo RVR" }), _jsx("h1", { className: "mt-4 text-4xl font-black tracking-tight lg:text-5xl", children: "Escolha o modo de visualiza\u00E7\u00E3o" }), _jsx("p", { className: "mx-auto mt-3 max-w-3xl text-lg text-brand-dark/70", children: "A mesma base de dados alimenta o totem f\u00EDsico para pacientes e o aplicativo de monitoramento usado pela equipe." })] }), _jsx("div", { className: "mt-10 grid gap-6 lg:grid-cols-2", children: screens.map((screen) => (_jsxs("div", { className: "rounded-[28px] border border-brand-sand bg-brand-sand/70 p-6", children: [_jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.5em] text-brand-marine/70", children: screen.highlight }), _jsx("h2", { className: "mt-4 text-3xl font-black text-brand-marine", children: screen.title }), _jsx("p", { className: "mt-2 text-sm text-brand-dark/80", children: screen.description }), _jsx(Button, { className: "mt-8", onClick: () => navigate(screen.path), variant: screen.id === "app" ? "secondary" : "primary", children: "Acessar" })] }, screen.id))) }), _jsx("p", { className: "mt-8 text-center text-xs uppercase tracking-[0.5em] text-brand-marine/70", children: "Totem e aplicativo sincronizados via PatientsContext" })] }) }));
}
