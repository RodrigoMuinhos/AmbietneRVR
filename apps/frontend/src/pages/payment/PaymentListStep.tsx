import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { maskPatientName, formatCurrency } from "../../utils/formatters";

export function PaymentListStep() {
  const navigate = useNavigate();
  const { patients, selectedPaymentLetter, selectPatient, clearSelection } =
    usePatients();

  useEffect(() => {
    if (!selectedPaymentLetter) {
      navigate("/totem/pagamento/letra", { replace: true });
    } else {
      clearSelection();
    }
  }, [selectedPaymentLetter, navigate, clearSelection]);

  if (!selectedPaymentLetter) {
    return null;
  }

  const filtered = patients.filter(
    (patient) =>
      patient.statusPagamento === "pendente" &&
      patient.nomeCompleto
        .toLocaleUpperCase()
        .startsWith(selectedPaymentLetter),
  );

  return (
    <StepLayout
      title="Encontre seu nome"
      subtitle="Pagamentos já feitos não aparecem aqui"
    >
      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-6 text-center text-slate-500">
            Nenhum pagamento pendente para a letra{" "}
            <strong>{selectedPaymentLetter}</strong>.
          </div>
        )}

        {filtered.map((patient) => (
          <button
            key={patient.id}
            type="button"
            className="rounded-2xl border-2 border-slate-200 bg-white px-6 py-4 text-left text-2xl font-semibold text-slate-900 transition hover:border-slate-400"
            onClick={() => {
              selectPatient(patient.id);
              navigate("/totem/pagamento/confirmar");
            }}
          >
            <div className="flex items-center justify-between">
              <span>{maskPatientName(patient.nomeCompleto)}</span>
              <span className="text-base font-medium text-amber-500">
                {formatCurrency(patient.valor)}
              </span>
            </div>
          </button>
        ))}
      </div>

      <Button variant="ghost" onClick={() => navigate("/totem")}>
        Cancelar
      </Button>
    </StepLayout>
  );
}

