import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { KeyboardNumeric } from "../../components/KeyboardNumeric";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone, normalizePhone } from "../../utils/formatters";
export function CheckinPhoneStep() {
    const navigate = useNavigate();
    const { findPatientByPhone, selectPatient } = usePatients();
    const [phone, setPhone] = useState("");
    const [feedback, setFeedback] = useState(null);
    const handleConfirm = () => {
        const normalized = normalizePhone(phone);
        if (normalized.length < 10) {
            setFeedback("Digite o telefone completo com DDD.");
            return;
        }
        const found = findPatientByPhone(phone);
        if (found) {
            selectPatient(found.id);
            setFeedback(null);
            navigate("/totem/checkin/confirmar");
        }
        else {
            setFeedback("Não encontramos seu cadastro. Verifique os dados.");
        }
    };
    return (_jsxs(StepLayout, { title: "Digite seu telefone", subtitle: "Use o n\u00FAmero informado no agendamento.", children: [_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx("div", { className: "rounded-3xl border-2 border-slate-200 bg-white px-6 py-4 text-3xl font-semibold tracking-wide text-slate-900", children: formatPhone(phone) || "(  ) _____-____" }), feedback && (_jsx("p", { className: "text-base font-medium text-rose-600", children: feedback }))] }), _jsx(KeyboardNumeric, { onInput: (digit) => {
                    setPhone((prev) => {
                        const next = normalizePhone(prev + digit).slice(0, 11);
                        return next;
                    });
                }, onDelete: () => setPhone((prev) => prev.slice(0, Math.max(prev.length - 1, 0))), onClear: () => setPhone("") }), _jsxs("div", { className: "mt-6 flex flex-col gap-4", children: [_jsx(Button, { onClick: handleConfirm, children: "Confirmar telefone" }), _jsx(Button, { variant: "ghost", onClick: () => navigate("/totem"), children: "Cancelar" })] })] }));
}
