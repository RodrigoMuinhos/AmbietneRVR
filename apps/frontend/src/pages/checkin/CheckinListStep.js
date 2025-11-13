import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { maskPatientName } from "../../utils/formatters";
export function CheckinListStep() {
    const navigate = useNavigate();
    const { patients, selectedCheckinLetter, selectPatient, clearSelection } = usePatients();
    useEffect(() => {
        if (!selectedCheckinLetter) {
            navigate("/totem/checkin/letra", { replace: true });
        }
        else {
            clearSelection();
        }
    }, [selectedCheckinLetter, navigate, clearSelection]);
    if (!selectedCheckinLetter) {
        return null;
    }
    const filtered = patients.filter((patient) => patient.statusCheckin === "pendente" &&
        patient.nomeCompleto
            .toLocaleUpperCase()
            .startsWith(selectedCheckinLetter));
    return (_jsxs(StepLayout, { title: "Resultados da busca", subtitle: "Encontre seu nome na lista", children: [_jsx("p", { className: "text-center text-base text-slate-500", children: "Check-ins j\u00E1 realizados n\u00E3o aparecem aqui." }), _jsxs("div", { className: "flex flex-col gap-4", children: [filtered.length === 0 && (_jsxs("div", { className: "rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-6 text-center text-slate-500", children: ["Nenhum paciente pendente encontrado para a letra", " ", _jsx("strong", { children: selectedCheckinLetter }), "."] })), filtered.map((patient) => (_jsx("button", { type: "button", className: "rounded-2xl border-2 border-slate-200 bg-white px-6 py-5 text-left text-2xl font-semibold capitalize text-slate-900 transition hover:border-slate-400", onClick: () => {
                            selectPatient(patient.id);
                            navigate("/totem/checkin/confirmar");
                        }, children: maskPatientName(patient.nomeCompleto) }, patient.id)))] }), _jsxs("div", { className: "mt-4 flex flex-col gap-4", children: [_jsx(Button, { variant: "secondary", onClick: () => navigate("/totem/checkin/telefone"), children: "N\u00E3o encontro meu nome" }), _jsx(Button, { variant: "ghost", onClick: () => navigate("/totem"), children: "Cancelar" })] })] }));
}
