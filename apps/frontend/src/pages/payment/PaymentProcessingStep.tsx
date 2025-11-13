import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { usePatients } from "../../context/PatientsContext";
import { formatCurrency } from "../../utils/formatters";

export function PaymentProcessingStep() {
  const navigate = useNavigate();
  const {
    selectedPatient,
    selectedPaymentMethod,
    updatePatient,
    selectedInstallments,
  } = usePatients();
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

  const paymentLabel =
    selectedPaymentMethod === "credito"
      ? `Cartão de crédito (${selectedInstallments ?? "1x"})`
      : selectedPaymentMethod === "debito"
        ? "Cartão de débito"
        : "Pix";

  return (
    <StepLayout
      title="Pagamento em andamento"
      subtitle="Aproxime ou insira o cartão e aguarde"
      background="blue"
    >
      <div className="rounded-3xl bg-white/10 px-8 py-10 shadow-inner">
        <p className="text-lg text-white/70">Paciente</p>
        <p className="text-3xl font-black">{selectedPatient.nomeCompleto}</p>
        <p className="mt-4 text-2xl font-semibold text-amber-300">
          {formatCurrency(selectedPatient.valor)}
        </p>
        <p className="mt-2 text-lg text-white/70">{paymentLabel}</p>

        <div className="mt-8 h-4 rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-amber-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </StepLayout>
  );
}

