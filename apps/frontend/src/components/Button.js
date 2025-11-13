import { jsx as _jsx } from "react/jsx-runtime";
const variantClasses = {
    primary: "bg-amber-400 text-slate-900 hover:bg-amber-300 focus:ring-amber-200",
    secondary: "bg-white text-slate-900 hover:bg-white/90 focus:ring-white/60 border border-slate-200",
    ghost: "bg-transparent border-2 border-slate-300 text-slate-700 hover:border-slate-500 focus:ring-slate-200",
    danger: "bg-rose-500 text-white hover:bg-rose-400 focus:ring-rose-200 border border-rose-400/40",
};
export function Button({ children, variant = "primary", className = "", fullWidth = true, ...props }) {
    return (_jsx("button", { className: `rounded-2xl px-6 py-4 text-xl font-semibold shadow-lg transition focus:outline-none focus:ring-4 ${fullWidth ? "w-full" : ""} ${variantClasses[variant]} ${className}`, ...props, children: children }));
}
