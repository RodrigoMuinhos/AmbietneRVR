import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone } from "../../utils/formatters";
export function CheckinConfirmStep() {
    const navigate = useNavigate();
    const { selectedPatient } = usePatients();
    useEffect(() => {
        if (!selectedPatient) {
            navigate("/totem/checkin/letra", { replace: true });
        }
    }, [selectedPatient, navigate]);
    if (!selectedPatient) {
        return null;
    }
    const appointment = selectedPatient.appointment ?? {
        data: "Hoje",
        hora: "15:30",
        endereco: "Rua das Palmeiras, 120 - Centro",
        tipo: "Primeira consulta",
    };
    return (_jsxs(StepLayout, { title: "Confirme seus dados", subtitle: "Podemos avisar que voc\u00EA chegou?", background: "blue", children: [_jsxs("div", { className: "rounded-3xl bg-brand-sand/70 px-8 py-10 shadow-inner", children: [_jsxs("div", { className: "flex flex-col gap-1 text-brand-dark", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.4em] text-brand-marine/70", children: "Paciente" }), _jsx("p", { className: "text-3xl font-black uppercase tracking-wide text-brand-marine", children: selectedPatient.nomeCompleto }), _jsxs("p", { className: "text-sm text-brand-dark/70", children: ["Telefone: ", formatPhone(selectedPatient.telefone)] })] }), _jsxs("div", { className: "mt-6 grid gap-4 lg:grid-cols-2", children: [_jsxs("div", { className: "rounded-2xl bg-white px-4 py-3 text-sm text-brand-dark", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine/70", children: "Consulta agendada" }), _jsxs("p", { className: "text-lg font-semibold", children: [appointment.tipo, " \u2022 ", appointment.hora] }), _jsx("p", { className: "text-xs text-brand-dark/70", children: appointment.data })] }), _jsxs("div", { className: "rounded-2xl bg-white px-4 py-3 text-sm text-brand-dark", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine/70", children: "Endere\u00E7o da cl\u00EDnica" }), _jsx("p", { className: "text-lg font-semibold text-brand-marine", children: appointment.endereco })] })] }), _jsxs("div", { className: "mt-6 rounded-2xl bg-white px-4 py-3 text-sm text-brand-dark", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine/70", children: "Profissional" }), _jsxs("p", { className: "text-lg font-semibold text-brand-marine", children: ["Dra. ", selectedPatient.medico, " \u2022 ", selectedPatient.especialidade] })] })] }), _jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(Button, { variant: "ghost", onClick: () => navigate("/totem/checkin/lista"), fullWidth: false, className: "self-center border-white/60 text-white hover:border-white", children: "Voltar" }), _jsx(Button, { onClick: () => navigate("/totem/checkin/foto"), children: "Confirmar" })] })] }));
}
