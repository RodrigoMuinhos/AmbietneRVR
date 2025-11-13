import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { KeyboardLetters } from "../../components/KeyboardLetters";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
export function PaymentLetterStep() {
    const navigate = useNavigate();
    const { setSelectedPaymentLetter, clearSelection, selectedPaymentLetter, patients, selectPatient, addPatient, } = usePatients();
    const [searchTerm, setSearchTerm] = useState("");
    const [feedback, setFeedback] = useState(null);
    const inputRef = useRef(null);
    const handleVirtualKey = (letter) => {
        setSelectedPaymentLetter(letter);
        setSearchTerm((prev) => (prev + letter).trimStart());
        setFeedback(null);
        inputRef.current?.focus();
    };
    const suggestions = useMemo(() => {
        if (!searchTerm)
            return [];
        const normalized = searchTerm.toLowerCase();
        return patients
            .filter((patient) => patient.statusPagamento === "pendente" &&
            patient.nomeCompleto.toLowerCase().includes(normalized))
            .slice(0, 5);
    }, [patients, searchTerm]);
    const handleSuggestion = (patientId) => {
        selectPatient(patientId);
        const patient = patients.find((item) => item.id === patientId);
        if (patient?.nomeCompleto) {
            setSelectedPaymentLetter(patient.nomeCompleto.charAt(0).toUpperCase());
        }
        navigate("/totem/pagamento/confirmar");
    };
    const handleCreate = () => {
        if (searchTerm.trim().length < 3) {
            setFeedback("Informe ao menos 3 caracteres para cadastrar.");
            return;
        }
        const newPatient = addPatient(searchTerm.trim());
        selectPatient(newPatient.id);
        setSelectedPaymentLetter(newPatient.nomeCompleto.charAt(0).toUpperCase());
        navigate("/totem/pagamento/confirmar");
    };
    return (_jsxs(StepLayout, { title: "Pagamento", subtitle: "Selecione a primeira letra do seu nome", children: [_jsxs("div", { className: "rounded-3xl border border-brand-mist/40 bg-white/80 px-6 py-5 shadow-sm", children: [_jsx("p", { className: "text-sm font-semibold text-brand-marine uppercase tracking-[0.3em]", children: "Busca r\u00E1pida" }), _jsx("p", { className: "mt-1 text-sm text-brand-dark/70", children: "Digite o nome utilizando o teclado abaixo ou informe manualmente." }), _jsx("input", { ref: inputRef, type: "text", value: searchTerm, onChange: (event) => {
                            setSearchTerm(event.target.value);
                            setFeedback(null);
                        }, placeholder: "Ex.: Bruna Siqueira Andrade", className: "mt-3 w-full rounded-2xl border border-brand-mist/40 px-4 py-3 text-base focus:border-brand-marine focus:outline-none" }), feedback && (_jsx("p", { className: "mt-2 text-sm text-rose-500", children: feedback })), suggestions.length > 0 && (_jsx("div", { className: "mt-3 space-y-2", children: suggestions.map((patient) => (_jsx("button", { type: "button", onClick: () => handleSuggestion(patient.id), className: "w-full rounded-2xl border border-brand-mist/30 px-4 py-2 text-left text-sm font-semibold text-brand-dark transition hover:bg-brand-sand/70", children: patient.nomeCompleto }, patient.id))) })), _jsxs("div", { className: "mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between", children: [_jsx("span", { className: "text-xs text-brand-dark/60", children: "N\u00E3o encontrou? Cadastre o nome rapidamente." }), _jsx(Button, { type: "button", fullWidth: false, variant: "secondary", onClick: handleCreate, children: "Cadastrar nome" })] })] }), _jsx(KeyboardLetters, { onSelect: handleVirtualKey, selectedLetter: selectedPaymentLetter }), _jsx("div", { className: "mt-auto flex justify-center", children: _jsx(Button, { variant: "secondary", fullWidth: false, onClick: () => navigate("/totem"), children: "Voltar ao menu" }) })] }));
}
