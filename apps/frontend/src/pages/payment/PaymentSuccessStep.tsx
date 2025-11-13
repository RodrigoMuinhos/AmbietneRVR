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
  const {
    selectedPatient,
    selectedPaymentMethod,
    selectedInstallments,
    resetAll,
    sendWhatsappConfirmation,
    updatePatient,
  } = usePatients();

  const hasSentRef = useRef(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [receiptPhone, setReceiptPhone] = useState("");
  const [receiptError, setReceiptError] = useState<string | null>(null);
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

  return (
    <>
      <StepLayout
        title="Pagamento concluído!"
        subtitle="Tudo certo com a sua consulta."
      >
        <div className="rounded-3xl border-2 border-white/40 bg-white/90 px-8 py-10 text-center shadow-sm">
          <p className="text-3xl font-black">{selectedPatient.nomeCompleto}</p>
          <p className="mt-4 text-2xl font-semibold text-brand-sun">
            {formatCurrency(selectedPatient.valor)}
          </p>
          <p className="mt-4 text-lg text-brand-dark/70">
            {paymentMethodLabel[selectedPaymentMethod ?? "credito"]}
            {selectedPaymentMethod === "credito" && selectedInstallments
              ? ` • ${selectedInstallments}`
              : ""}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              resetAll();
              navigate("/totem");
            }}
          >
            Menu principal
          </Button>
          <Button variant="secondary" onClick={handleOpenReceipt}>
            Receber recibo no WhatsApp
          </Button>
        </div>
      </StepLayout>

      {showReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 text-brand-dark shadow-2xl">
            <h2 className="text-2xl font-bold">Enviar recibo</h2>
            <p className="mt-1 text-sm text-brand-dark/70">
              Informe seu WhatsApp para receber o comprovante desta consulta.
            </p>
            <input
              type="tel"
              value={maskedPhone(receiptPhone)}
              onChange={(event) => {
                setReceiptPhone(event.target.value);
                setReceiptError(null);
              }}
              className="mt-4 w-full rounded-2xl border border-brand-mist/40 px-4 py-3 text-base focus:border-brand-marine focus:outline-none"
              placeholder="(xx) x xxxx-xxxx"
            />
            {receiptError && (
              <p className="mt-2 text-sm text-rose-500">{receiptError}</p>
            )}
            {sending && (
              <div className="mt-3 rounded-2xl bg-brand-mist/40 px-4 py-3 text-sm text-brand-dark">
                Enviando recibo... aguarde alguns segundos.
              </div>
            )}
            {receiptSent && !receiptError && !sending && (
              <div className="mt-3 rounded-2xl bg-brand-sand/60 px-4 py-3 text-sm text-brand-dark">
                Recibo enviado para {receiptPhone}. Confira o WhatsApp para o
                comprovante.
              </div>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button
                variant="secondary"
                onClick={() => setShowReceiptModal(false)}
                className="sm:flex-1"
              >
                Fechar
              </Button>
              <Button
                onClick={handleSendReceipt}
                className="sm:flex-1"
                disabled={sending}
              >
                {sending ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
  const maskedPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    const parts = [
      digits.slice(0, 2),
      digits.slice(2, 3),
      digits.slice(3, 7),
      digits.slice(7, 11),
    ].filter(Boolean);
    if (parts.length === 0) return "";
    if (parts.length === 1) return `(${parts[0]}`;
    if (parts.length === 2) return `(${parts[0]}) ${parts[1]}`;
    if (parts.length === 3) return `(${parts[0]}) ${parts[1]} ${parts[2]}`;
    return `(${parts[0]}) ${parts[1]} ${parts[2]}-${parts[3]}`;
  };
