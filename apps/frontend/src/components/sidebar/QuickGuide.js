import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const steps = [
    {
        title: "1. Chegada",
        detail: "Selecione a letra ou informe telefone.",
    },
    {
        title: "2. Confirmação",
        detail: "Valide médico, especialidade e tire a foto.",
    },
    {
        title: "3. Pagamento",
        detail: "Escolha método, parcelas e aguarde o totem.",
    },
    {
        title: "4. CRM",
        detail: "Equipe acompanha tudo pelo painel principal.",
    },
];
export function QuickGuide() {
    return (_jsxs("section", { className: "rounded-3xl border border-white/50 bg-white/80 p-5 shadow-lg", children: [_jsxs("header", { children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine", children: "Guia pr\u00E1tico" }), _jsx("h3", { className: "text-lg font-semibold text-brand-dark", children: "Como o totem orienta o paciente" })] }), _jsx("ol", { className: "mt-4 space-y-3 text-sm", children: steps.map((step) => (_jsxs("li", { className: "rounded-2xl bg-brand-sand/60 px-3 py-3", children: [_jsx("p", { className: "font-semibold text-brand-marine", children: step.title }), _jsx("p", { className: "text-xs text-brand-dark/70", children: step.detail })] }, step.title))) })] }));
}
