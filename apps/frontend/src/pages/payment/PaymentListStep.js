import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { maskPatientName, formatCurrency } from "../../utils/formatters";
export function PaymentListStep() {
    const navigate = useNavigate();
    const { patients, selectedPaymentLetter, selectPatient, clearSelection } = usePatients();
    useEffect(() => {
        if (!selectedPaymentLetter) {
            navigate("/totem/pagamento/letra", { replace: true });
        }
        else {
            clearSelection();
        }
    }, [selectedPaymentLetter, navigate, clearSelection]);
    if (!selectedPaymentLetter) {
        return null;
    }
    const filtered = patients.filter((patient) => patient.statusPagamento === "pendente" &&
        patient.nomeCompleto
            .toLocaleUpperCase()
            .startsWith(selectedPaymentLetter));
    return (_jsxs(StepLayout, { title: "Encontre seu nome", subtitle: "Pagamentos j\u00E1 feitos n\u00E3o aparecem aqui", children: [_jsxs("div", { className: "flex flex-col gap-4", children: [filtered.length === 0 && (_jsxs("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-6 text-center text-slate-500", children: ["Nenhum pagamento pendente para a letra", " ", _jsx("strong", { children: selectedPaymentLetter }), "."] })), filtered.map((patient) => (_jsx("button", { type: "button", className: "rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-left text-2xl font-semibold text-slate-900 transition hover:border-slate-400", onClick: () => {
                            selectPatient(patient.id);
                            navigate("/totem/pagamento/confirmar");
                        }, children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { children: maskPatientName(patient.nomeCompleto) }), _jsx("span", { className: "text-base font-medium text-amber-500", children: formatCurrency(patient.valor) })] }) }, patient.id)))] }), _jsx(Button, { variant: "ghost", onClick: () => navigate("/totem"), children: "Cancelar" })] }));
}
