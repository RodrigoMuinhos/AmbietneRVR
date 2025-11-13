import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
export function CheckinSuccessStep() {
    const navigate = useNavigate();
    const { selectedPatient, updatePatient, resetAll, setSelectedPaymentLetter, } = usePatients();
    useEffect(() => {
        if (!selectedPatient) {
            navigate("/totem", { replace: true });
            return;
        }
        if (selectedPatient.statusCheckin !== "feito") {
            updatePatient(selectedPatient.id, { statusCheckin: "feito" });
        }
    }, [selectedPatient, updatePatient, navigate]);
    if (!selectedPatient) {
        return null;
    }
    const appointment = selectedPatient.appointment ?? {
        data: "Hoje",
        hora: "15:30",
        endereco: "Rua das Palmeiras, 120 - Centro",
        tipo: "Primeira consulta",
    };
    return (_jsxs(StepLayout, { title: "Tudo certo!", subtitle: "Voc\u00EA confirmou sua chegada.", background: "blue", children: [_jsxs("div", { className: "flex flex-col items-center gap-6 text-center", children: [_jsx("img", { src: selectedPatient.fotoMedico, alt: `Foto da médica ${selectedPatient.medico}`, className: "h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg" }), _jsxs("div", { children: [_jsxs("p", { className: "text-2xl font-semibold", children: ["Dra. ", selectedPatient.medico] }), _jsx("p", { className: "text-lg text-white/70", children: selectedPatient.especialidade })] }), _jsx("p", { className: "text-xl font-medium text-white/80", children: "Em breve voc\u00EA ser\u00E1 chamado(a). Obrigado!" }), _jsxs("div", { className: "w-full rounded-3xl bg-white px-6 py-4 text-sm text-brand-dark", children: [_jsx("p", { className: "text-xs uppercase tracking-[0.3em] text-brand-marine/70", children: "Detalhes da consulta" }), _jsxs("p", { className: "mt-2 font-semibold", children: [appointment.tipo, " \u2022 ", appointment.hora, " \u2013 ", appointment.data] }), _jsx("p", { className: "text-xs text-brand-dark/70", children: appointment.endereco })] })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Button, { onClick: () => {
                            resetAll();
                            navigate("/totem");
                        }, children: "Menu principal" }), _jsx(Button, { variant: "secondary", onClick: () => {
                            if (selectedPatient) {
                                setSelectedPaymentLetter(selectedPatient.nomeCompleto.charAt(0).toUpperCase());
                            }
                            navigate("/totem/pagamento/confirmar");
                        }, children: "Ir para pagamento" })] })] }));
}
