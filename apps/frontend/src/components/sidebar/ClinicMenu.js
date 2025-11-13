import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs("section", { className: "rounded-3xl border border-white/50 bg-white/80 p-5 shadow-lg", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine", children: "Na cl\u00EDnica hoje" }), _jsx("h3", { className: "text-lg font-semibold text-brand-dark", children: "Opera\u00E7\u00F5es ativas" })] }), _jsx("span", { className: "rounded-full bg-brand-sand px-3 py-1 text-xs font-semibold text-brand-marine", children: "CRM Live" })] }), _jsx("ul", { className: "mt-4 space-y-3 text-sm", children: services.map((service) => (_jsxs("li", { className: "flex items-start gap-3 rounded-2xl bg-white/80 px-3 py-3", children: [_jsx("span", { className: `flex h-10 w-10 items-center justify-center rounded-2xl text-xl ${service.accent}`, children: service.icon }), _jsxs("div", { children: [_jsx("p", { className: "font-semibold text-brand-dark", children: service.title }), _jsx("p", { className: "text-xs text-brand-marine/80", children: service.detail })] })] }, service.title))) })] }));
}
