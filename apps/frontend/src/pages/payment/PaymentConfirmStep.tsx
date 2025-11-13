import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatCurrency } from "../../utils/formatters";

export function PaymentConfirmStep() {
  const navigate = useNavigate();
  const { selectedPatient } = usePatients();

  useEffect(() => {
    if (!selectedPatient) {
      navigate("/totem/pagamento/letra", { replace: true });
    }
  }, [selectedPatient, navigate]);

  if (!selectedPatient) {
    return null;
  }

  return (
    <StepLayout
      title="Confirme o paciente"
      subtitle="Revise antes de continuar"
      background="blue"
    >
      <div className="rounded-3xl bg-white/10 px-8 py-10 text-center shadow-inner">
        <p className="text-3xl font-black uppercase tracking-wide">
          {selectedPatient.nomeCompleto}
        </p>
        <p className="mt-4 text-xl font-medium text-white/80">
          Dra. {selectedPatient.medico} • {selectedPatient.especialidade}
        </p>
        <p className="mt-6 text-3xl font-bold text-amber-300">
          {formatCurrency(selectedPatient.valor)}
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/totem/pagamento/lista")}
          fullWidth={false}
          className="self-center border-white/60 text-white hover:border-white"
        >
          Voltar
        </Button>
        <Button onClick={() => navigate("/totem/pagamento/metodo")}>
          Confirmar
        </Button>
      </div>
    </StepLayout>
  );
}

