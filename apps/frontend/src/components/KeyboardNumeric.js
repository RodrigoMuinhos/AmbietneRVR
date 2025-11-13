import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const DIGITS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
export function KeyboardNumeric({ onInput, onDelete, onClear, }) {
    return (_jsxs("div", { className: "mx-auto grid max-w-sm grid-cols-3 gap-3", children: [DIGITS.map((digit) => (_jsx("button", { type: "button", className: "rounded-2xl border-2 border-slate-200 bg-white py-5 text-2xl font-bold text-slate-900 shadow-sm transition hover:border-slate-400", onClick: () => onInput(digit), children: digit }, digit))), _jsx("button", { type: "button", className: "rounded-2xl border-2 border-rose-200 bg-rose-50 py-5 text-xl font-semibold text-rose-600 transition hover:border-rose-400", onClick: onDelete, children: "\u232B" }), _jsx("button", { type: "button", className: "col-span-2 rounded-2xl border-2 border-slate-200 bg-slate-900 py-5 text-xl font-semibold text-white transition hover:bg-slate-700", onClick: onClear, children: "Limpar" })] }));
}
