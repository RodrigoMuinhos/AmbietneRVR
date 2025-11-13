import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CRMBackdrop() {
    return (_jsx("div", { className: "pointer-events-none absolute inset-0 overflow-hidden", children: _jsxs("div", { className: "absolute -right-28 top-12 hidden rotate-6 rounded-[32px] border border-white/20 bg-white/15 p-6 text-sm text-white shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:block", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-white/60", children: "CRM \u2022 Painel m\u00E9dico" }), _jsx("h4", { className: "mt-2 text-2xl font-semibold", children: "Fluxo de pacientes" }), _jsx("div", { className: "mt-4 space-y-3", children: ["Check-in", "Sala de exames", "Pagamento"].map((stage) => (_jsxs("div", { className: "rounded-2xl border border-white/20 bg-white/15 px-4 py-3", children: [_jsx("p", { className: "text-xs uppercase tracking-widest text-white/60", children: stage }), _jsx("p", { className: "text-lg font-semibold", children: stage === "Check-in"
                                    ? "12 pacientes"
                                    : stage === "Sala de exames"
                                        ? "08 em andamento"
                                        : "5 pendentes" })] }, stage))) })] }) }));
}
