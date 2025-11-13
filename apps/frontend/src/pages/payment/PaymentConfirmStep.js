import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatCurrency } from "../../utils/formatters";
export function PaymentConfirmStep() {
    const navigate = useNavigate();
    const { selectedPatient } = usePatients();
    useEffect(() => {
        if (!selectedPatient) {
            navigate("/totem/pagamento/letra", { replace: true });
        }
    }, [selectedPatient, navigate]);
    if (!selectedPatient) {
        return null;
    }
    return (_jsxs(StepLayout, { title: "Confirme o paciente", subtitle: "Revise antes de continuar", background: "blue", children: [_jsxs("div", { className: "rounded-3xl bg-white/10 px-8 py-10 text-center shadow-inner", children: [_jsx("p", { className: "text-3xl font-black uppercase tracking-wide", children: selectedPatient.nomeCompleto }), _jsxs("p", { className: "mt-4 text-xl font-medium text-white/80", children: ["Dra. ", selectedPatient.medico, " \u2022 ", selectedPatient.especialidade] }), _jsx("p", { className: "mt-6 text-3xl font-bold text-amber-300", children: formatCurrency(selectedPatient.valor) })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate("/totem/pagamento/lista"), fullWidth: false, className: "self-center border-white/60 text-white hover:border-white", children: "Voltar" }), _jsx(Button, { onClick: () => navigate("/totem/pagamento/metodo"), children: "Confirmar" })] })] }));
}
