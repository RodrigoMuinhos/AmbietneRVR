import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useMemo, useRef, useState, } from "react";
import { patientsSeed } from "../mock/patients";
import { formatPhone, normalizePhone } from "../utils/formatters";
const PatientsContext = createContext(undefined);
const initialChatMessages = [
    {
        id: "m1",
        author: "assistant",
        text: "Olá! Sou o Assistente RVR e fico ao lado do totem para orientar o paciente e a equipe.",
        timestamp: Date.now(),
    },
    {
        id: "m2",
        author: "assistant",
        text: "Informe seu celular/WhatsApp para eu avisar quando o pagamento for confirmado.",
        timestamp: Date.now(),
    },
];
const createMessageId = () => Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
export function PatientsProvider({ children }) {
    const [patients, setPatients] = useState(() => patientsSeed);
    const [selectedPatientId, setSelectedPatientId] = useState(null);
    const [selectedCheckinLetter, setSelectedCheckinLetter] = useState(null);
    const [selectedPaymentLetter, setSelectedPaymentLetter] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const [selectedInstallments, setSelectedInstallments] = useState(null);
    const [supportPhone, setSupportPhone] = useState("");
    const [chatMessages, setChatMessages] = useState(initialChatMessages);
    const lastWhatsappRef = useRef(null);
    const selectedPatient = patients.find((patient) => patient.id === selectedPatientId) ?? null;
    const selectPatient = useCallback((patientId) => {
        setSelectedPatientId(patientId);
    }, []);
    const clearSelection = useCallback(() => {
        setSelectedPatientId(null);
    }, []);
    const updatePatient = useCallback((patientId, changes) => {
        setPatients((prev) => prev.map((patient) => patient.id === patientId ? { ...patient, ...changes } : patient));
    }, []);
    const findPatientByPhone = useCallback((phone) => {
        const normalized = normalizePhone(phone);
        return (patients.find((patient) => normalizePhone(patient.telefone) === normalized) ?? null);
    }, [patients]);
    const resetAll = useCallback(() => {
        setSelectedPatientId(null);
        setSelectedCheckinLetter(null);
        setSelectedPaymentLetter(null);
        setSelectedPaymentMethod(null);
        setSelectedInstallments(null);
        lastWhatsappRef.current = null;
    }, []);
    const addChatMessage = useCallback((author, text) => {
        setChatMessages((prev) => [
            ...prev,
            {
                id: createMessageId(),
                author,
                text,
                timestamp: Date.now(),
            },
        ]);
    }, []);
    const registerSupportPhone = useCallback((phone) => {
        const normalized = normalizePhone(phone);
        if (!normalized.length)
            return;
        setSupportPhone(normalized);
        addChatMessage("assistant", `Perfeito! Vou usar ${formatPhone(normalized)} para enviar atualizações.`);
    }, [addChatMessage]);
    const addPatientCallback = useCallback((name) => {
        const newPatient = {
            id: `p-${crypto?.randomUUID?.() ?? Date.now().toString()}`,
            nomeCompleto: name,
            telefone: `11${Math.floor(Math.random() * 900000000 + 100000000)
                .toString()
                .padStart(9, "0")}`,
            medico: "Equipe de plantão",
            especialidade: "Clínica geral",
            statusCheckin: "pendente",
            statusPagamento: "pendente",
            valor: 480,
            fotoMedico: "https://images.unsplash.com/photo-1524504388940-b1c1722653e6?auto=format&w=400&q=60",
            appointment: {
                data: "13/11/2025",
                hora: "16:00",
                endereco: "Rua das Palmeiras, 120 - Centro",
                tipo: "Primeira consulta",
            },
        };
        setPatients((prev) => [...prev, newPatient]);
        return newPatient;
    }, []);
    const sendWhatsappConfirmation = useCallback((patient, scenario) => {
        if (!patient)
            return;
        const label = scenario === "pagamento"
            ? "confirmamos o pagamento de"
            : "confirmamos o check-in de";
        if (!supportPhone) {
            addChatMessage("assistant", "Para te avisar por WhatsApp, compartilhe o número no campo ao lado do totem.");
            return;
        }
        const uniqueKey = `${scenario}-${patient.id}`;
        if (lastWhatsappRef.current === uniqueKey) {
            return;
        }
        lastWhatsappRef.current = uniqueKey;
        addChatMessage("assistant", `Enviei um WhatsApp para ${formatPhone(supportPhone)} avisando que ${label} ${patient.nomeCompleto}.`);
    }, [supportPhone, addChatMessage]);
    const value = useMemo(() => ({
        patients,
        selectedPatient,
        selectPatient,
        updatePatient,
        selectedCheckinLetter,
        setSelectedCheckinLetter,
        selectedPaymentLetter,
        setSelectedPaymentLetter,
        findPatientByPhone,
        resetAll,
        clearSelection,
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        selectedInstallments,
        setSelectedInstallments,
        supportPhone,
        registerSupportPhone,
        chatMessages,
        addChatMessage,
        sendWhatsappConfirmation,
        addPatient: addPatientCallback,
    }), [
        patients,
        selectedPatient,
        selectPatient,
        updatePatient,
        selectedCheckinLetter,
        selectedPaymentLetter,
        findPatientByPhone,
        resetAll,
        clearSelection,
        selectedPaymentMethod,
        selectedInstallments,
        supportPhone,
        chatMessages,
        addChatMessage,
        sendWhatsappConfirmation,
        addPatientCallback,
    ]);
    return (_jsx(PatientsContext.Provider, { value: value, children: children }));
}
export const usePatients = () => {
    const context = useContext(PatientsContext);
    if (!context) {
        throw new Error("usePatients must be used within PatientsProvider");
    }
    return context;
};
