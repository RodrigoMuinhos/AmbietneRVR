import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { usePatients } from "../../context/PatientsContext";
import { formatCurrency } from "../../utils/formatters";
export function PaymentProcessingStep() {
    const navigate = useNavigate();
    const { selectedPatient, selectedPaymentMethod, updatePatient, selectedInstallments, } = usePatients();
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        if (!selectedPatient || !selectedPaymentMethod) {
            navigate("/totem/pagamento/letra", { replace: true });
            return;
        }
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 20;
            });
        }, 500);
        const timer = setTimeout(() => {
            updatePatient(selectedPatient.id, { statusPagamento: "pago" });
            navigate("/totem/pagamento/sucesso");
        }, 3000);
        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, [
        selectedPatient,
        selectedPaymentMethod,
        navigate,
        updatePatient,
        selectedInstallments,
    ]);
    if (!selectedPatient || !selectedPaymentMethod) {
        return null;
    }
    const paymentLabel = selectedPaymentMethod === "credito"
        ? `Cartão de crédito (${selectedInstallments ?? "1x"})`
        : selectedPaymentMethod === "debito"
            ? "Cartão de débito"
            : "Pix";
    return (_jsx(StepLayout, { title: "Pagamento em andamento", subtitle: "Aproxime ou insira o cart\u00E3o e aguarde", background: "blue", children: _jsxs("div", { className: "rounded-3xl bg-white/10 px-8 py-10 shadow-inner", children: [_jsx("p", { className: "text-lg text-white/70", children: "Paciente" }), _jsx("p", { className: "text-3xl font-black", children: selectedPatient.nomeCompleto }), _jsx("p", { className: "mt-4 text-2xl font-semibold text-amber-300", children: formatCurrency(selectedPatient.valor) }), _jsx("p", { className: "mt-2 text-lg text-white/70", children: paymentLabel }), _jsx("div", { className: "mt-8 h-4 rounded-full bg-white/20", children: _jsx("div", { className: "h-full rounded-full bg-amber-400 transition-all", style: { width: `${progress}%` } }) })] }) }));
}
