import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatCurrency } from "../../utils/formatters";

const PIX_PAYLOAD =
  "00020126580014br.gov.bcb.pix0136clinica-horizonte@pagamentos.combr5204000053039865802BR5921Clinica Horizonte6014Sao Paulo62070503***6304ABCD";

const PIX_QR_SVG = `
<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" width="140" height="140" preserveAspectRatio="xMidYMid meet">
  <rect width="140" height="140" rx="16" fill="#f5f5f5"/>
  <g fill="#0f172a">
    <rect x="10" y="10" width="30" height="30" rx="4"/>
    <rect x="100" y="10" width="30" height="30" rx="4"/>
    <rect x="10" y="100" width="30" height="30" rx="4"/>
    <rect x="55" y="10" width="12" height="12"/>
    <rect x="75" y="10" width="12" height="12"/>
    <rect x="55" y="30" width="12" height="12"/>
    <rect x="75" y="30" width="12" height="12"/>
    <rect x="55" y="90" width="12" height="12"/>
    <rect x="75" y="90" width="12" height="12"/>
    <rect x="55" y="110" width="12" height="12"/>
    <rect x="75" y="110" width="12" height="12"/>
    <rect x="35" y="55" width="12" height="12"/>
    <rect x="55" y="55" width="12" height="12"/>
    <rect x="75" y="55" width="12" height="12"/>
    <rect x="95" y="55" width="12" height="12"/>
    <rect x="115" y="55" width="12" height="12"/>
    <rect x="35" y="75" width="12" height="12"/>
    <rect x="95" y="75" width="12" height="12"/>
    <rect x="115" y="75" width="12" height="12"/>
  </g>
</svg>
`;

export function PaymentMethodStep() {
  const navigate = useNavigate();
  const {
    selectedPatient,
    setSelectedPaymentMethod,
    setSelectedInstallments,
  } = usePatients();
  const [showPixModal, setShowPixModal] = useState(false);

  useEffect(() => {
    if (!selectedPatient) {
      navigate("/totem/pagamento/letra", { replace: true });
    }
  }, [selectedPatient, navigate]);

  if (!selectedPatient) {
    return null;
  }

  const goToProcessing = (method: "debito" | "pix") => {
    setSelectedPaymentMethod(method);
    setSelectedInstallments(null);
    navigate("/totem/pagamento/andamento");
  };

  const goToInstallments = () => {
    setSelectedPaymentMethod("credito");
    navigate("/totem/pagamento/parcelas");
  };

  const openPixModal = () => {
    setShowPixModal(true);
    setSelectedPaymentMethod("pix");
    setSelectedInstallments(null);
  };

  return (
    <StepLayout
      title="Selecione a forma de pagamento"
      subtitle={`O valor é ${formatCurrency(selectedPatient.valor)}`}
      showExitButton={false}
    >
      <div className="rounded-3xl border-2 border-slate-200 bg-white px-6 py-5 text-center text-lg">
        <p className="font-semibold text-slate-500">Paciente</p>
        <p className="text-2xl font-black text-slate-900">
          {selectedPatient.nomeCompleto}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Button onClick={goToInstallments}>Crédito</Button>
        <Button variant="secondary" onClick={() => goToProcessing("debito")}>
          Débito
        </Button>
        <Button variant="secondary" onClick={openPixModal}>
          Pix
        </Button>
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate("/totem/pagamento/confirmar")}
      >
        Voltar
      </Button>

      {showPixModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 text-center shadow-2xl">
            <h2 className="text-2xl font-bold text-brand-dark">Pix da clínica</h2>
            <p className="mt-2 text-sm text-brand-dark/70">
              Escaneie o QR Code ou copie a chave abaixo e finalize a transferência.
            </p>
            <div className="mx-auto mt-4 flex w-full max-w-xs items-center justify-center rounded-3xl border border-brand-mist/40 bg-brand-sand/50 p-4">
              <div
                className="w-48"
                dangerouslySetInnerHTML={{ __html: PIX_QR_SVG }}
              />
            </div>
            <div className="mt-4 rounded-2xl bg-brand-sand/60 px-4 py-3 text-sm text-left">
              <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
                Dados bancários
              </p>
              <p className="font-semibold text-brand-dark">
                Banco: 260 - Nu Pagamentos
              </p>
              <p className="text-brand-dark/70">Agência: 0001 • Conta: 123456-7</p>
              <p className="text-brand-dark/70">
                Titular: Clínica Horizonte Serviços Médicos
              </p>
            </div>
            <div className="mt-3 rounded-2xl bg-brand-mist/40 px-4 py-3 text-xs text-left text-brand-dark/70 break-all">
              {PIX_PAYLOAD}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button variant="secondary" onClick={() => setShowPixModal(false)}>
                Fechar
              </Button>
              <Button onClick={() => goToProcessing("pix")}>Continuar</Button>
            </div>
          </div>
        </div>
      )}
    </StepLayout>
  );
}
