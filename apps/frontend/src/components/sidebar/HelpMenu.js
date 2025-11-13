import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const shortcuts = [
    { label: "Manual rápido", action: "Abrir PDF", accent: "bg-brand-sky/20" },
    { label: "Chamar concierge", action: "Totens 03/04", accent: "bg-brand-sun/20" },
    { label: "Notificar suporte", action: "Equipe Tech", accent: "bg-brand-marine/20" },
];
export function HelpMenu() {
    return (_jsxs("section", { className: "rounded-3xl border border-white/60 bg-white/85 p-5 shadow-lg", children: [_jsxs("header", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine", children: "Menu de aux\u00EDlio" }), _jsx("h3", { className: "text-lg font-semibold text-brand-dark", children: "Precisa de ajuda?" })] }), _jsxs("span", { className: "text-xs font-semibold text-brand-marine/70", children: [_jsx("span", { className: "text-green-500", children: "\u25CF" }), " equipe online"] })] }), _jsx("div", { className: "mt-4 flex flex-col gap-3 text-sm", children: shortcuts.map((shortcut) => (_jsxs("button", { type: "button", className: `flex items-center justify-between rounded-2xl border border-white/80 px-4 py-3 text-left font-semibold text-brand-dark transition hover:translate-x-1 ${shortcut.accent}`, children: [_jsx("span", { children: shortcut.label }), _jsx("span", { className: "text-xs font-normal text-brand-marine/80", children: shortcut.action })] }, shortcut.label))) })] }));
}
