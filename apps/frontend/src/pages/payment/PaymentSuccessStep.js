import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatCurrency } from "../../utils/formatters";
const paymentMethodLabel = {
    credito: "Cartão de crédito",
    debito: "Cartão de débito",
    pix: "Pix",
};
export function PaymentSuccessStep() {
    const navigate = useNavigate();
    const { selectedPatient, selectedPaymentMethod, selectedInstallments, resetAll, sendWhatsappConfirmation, updatePatient, } = usePatients();
    const hasSentRef = useRef(false);
    const [showReceiptModal, setShowReceiptModal] = useState(false);
    const [receiptPhone, setReceiptPhone] = useState("");
    const [receiptError, setReceiptError] = useState(null);
    const [receiptSent, setReceiptSent] = useState(false);
    const [sending, setSending] = useState(false);
    useEffect(() => {
        if (!selectedPatient) {
            navigate("/totem", { replace: true });
            return;
        }
        if (selectedPatient.statusPagamento !== "pago") {
            updatePatient(selectedPatient.id, { statusPagamento: "pago" });
        }
        if (!hasSentRef.current && selectedPatient) {
            sendWhatsappConfirmation(selectedPatient, "pagamento");
            hasSentRef.current = true;
        }
    }, [selectedPatient, navigate, updatePatient, sendWhatsappConfirmation]);
    if (!selectedPatient) {
        return null;
    }
    const handleOpenReceipt = () => {
        setReceiptPhone("");
        setReceiptError(null);
        setReceiptSent(false);
        setShowReceiptModal(true);
    };
    const handleSendReceipt = () => {
        const digits = receiptPhone.replace(/\D/g, "");
        if (digits.length < 10) {
            setReceiptError("Informe um telefone válido.");
            setReceiptSent(false);
            return;
        }
        setReceiptError(null);
        setSending(true);
        setTimeout(() => {
            setSending(false);
            setReceiptSent(true);
        }, 10000);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(StepLayout, { title: "Pagamento conclu\u00EDdo!", subtitle: "Tudo certo com a sua consulta.", children: [_jsxs("div", { className: "rounded-3xl border-2 border-white/40 bg-white/90 px-8 py-10 text-center shadow-sm", children: [_jsx("p", { className: "text-3xl font-black", children: selectedPatient.nomeCompleto }), _jsx("p", { className: "mt-4 text-2xl font-semibold text-brand-sun", children: formatCurrency(selectedPatient.valor) }), _jsxs("p", { className: "mt-4 text-lg text-brand-dark/70", children: [paymentMethodLabel[selectedPaymentMethod ?? "credito"], selectedPaymentMethod === "credito" && selectedInstallments
                                        ? ` • ${selectedInstallments}`
                                        : ""] })] }), _jsxs("div", { className: "flex flex-col gap-3", children: [_jsx(Button, { onClick: () => {
                                    resetAll();
                                    navigate("/totem");
                                }, children: "Menu principal" }), _jsx(Button, { variant: "secondary", onClick: handleOpenReceipt, children: "Receber recibo no WhatsApp" })] })] }), showReceiptModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4", children: _jsxs("div", { className: "w-full max-w-md rounded-3xl bg-white p-6 text-brand-dark shadow-2xl", children: [_jsx("h2", { className: "text-2xl font-bold", children: "Enviar recibo" }), _jsx("p", { className: "mt-1 text-sm text-brand-dark/70", children: "Informe seu WhatsApp para receber o comprovante desta consulta." }), _jsx("input", { type: "tel", value: maskedPhone(receiptPhone), onChange: (event) => {
                                setReceiptPhone(event.target.value);
                                setReceiptError(null);
                            }, className: "mt-4 w-full rounded-2xl border border-brand-mist/40 px-4 py-3 text-base focus:border-brand-marine focus:outline-none", placeholder: "(xx) x xxxx-xxxx" }), receiptError && (_jsx("p", { className: "mt-2 text-sm text-rose-500", children: receiptError })), sending && (_jsx("div", { className: "mt-3 rounded-2xl bg-brand-mist/40 px-4 py-3 text-sm text-brand-dark", children: "Enviando recibo... aguarde alguns segundos." })), receiptSent && !receiptError && !sending && (_jsxs("div", { className: "mt-3 rounded-2xl bg-brand-sand/60 px-4 py-3 text-sm text-brand-dark", children: ["Recibo enviado para ", receiptPhone, ". Confira o WhatsApp para o comprovante."] })), _jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between", children: [_jsx(Button, { variant: "secondary", onClick: () => setShowReceiptModal(false), className: "sm:flex-1", children: "Fechar" }), _jsx(Button, { onClick: handleSendReceipt, className: "sm:flex-1", disabled: sending, children: sending ? "Enviando..." : "Enviar" })] })] }) }))] }));
}
const maskedPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts = [
        digits.slice(0, 2),
        digits.slice(2, 3),
        digits.slice(3, 7),
        digits.slice(7, 11),
    ].filter(Boolean);
    if (parts.length === 0)
        return "";
    if (parts.length === 1)
        return `(${parts[0]}`;
    if (parts.length === 2)
        return `(${parts[0]}) ${parts[1]}`;
    if (parts.length === 3)
        return `(${parts[0]}) ${parts[1]} ${parts[2]}`;
    return `(${parts[0]}) ${parts[1]} ${parts[2]}-${parts[3]}`;
};
