import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { ExperienceShell } from "./layout/ExperienceShell";
import { usePatients } from "../context/PatientsContext";
const accentStyles = {
    yellow: {
        accent: "text-brand-sun",
        subtitle: "text-brand-dark/70",
        border: "border-brand-sun/40",
        highlight: "bg-brand-sun",
    },
    blue: {
        accent: "text-brand-marine",
        subtitle: "text-brand-dark/70",
        border: "border-brand-mist/50",
        highlight: "bg-brand-mist",
    },
    white: {
        accent: "text-brand-marine",
        subtitle: "text-brand-dark/70",
        border: "border-brand-mist/40",
        highlight: "bg-brand-marine",
    },
};
export function StepLayout({ title, subtitle, background = "yellow", children, footer, showExitButton = true, }) {
    const styles = accentStyles[background] ?? accentStyles.yellow;
    const navigate = useNavigate();
    const { resetAll } = usePatients();
    return (_jsx(ExperienceShell, { background: "white", showSidebar: false, showBackdrop: false, children: _jsxs("div", { className: "relative flex min-h-[calc(100vh-8rem)] flex-col rounded-[28px] border border-brand-mist/40 bg-white px-8 py-10 text-brand-dark shadow-md lg:px-12", children: [showExitButton && (_jsx("button", { type: "button", onClick: () => {
                        resetAll();
                        navigate("/");
                    }, className: "absolute right-4 top-4 h-4 w-4 rounded-full border border-brand-mist/40 bg-brand-sand/80 opacity-20 transition hover:opacity-80 focus:opacity-80 focus:outline-none", title: "Sair do totem", children: _jsx("span", { className: "sr-only", children: "Voltar para a escolha inicial" }) })), _jsxs("header", { className: "flex flex-col gap-3 text-left", children: [_jsx("p", { className: `text-xs uppercase tracking-[0.6em] ${styles.accent}`, children: "Cl\u00EDnica Horizonte \u00B7 Totem" }), _jsx("div", { className: `h-1 w-14 rounded-full ${styles.highlight}` }), _jsx("h1", { className: "text-4xl font-black tracking-tight lg:text-5xl", children: title }), subtitle && (_jsx("p", { className: `text-lg font-medium ${styles.subtitle}`, children: subtitle }))] }), _jsx("div", { className: "mt-8 flex flex-1 flex-col gap-8 text-lg", children: children }), footer && (_jsx("div", { className: `mt-10 border-t ${styles.border} pt-6`, children: footer }))] }) }));
}
