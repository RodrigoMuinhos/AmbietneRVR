import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";

const OPTIONS = ["1x à vista", "2x sem juros", "3x sem juros", "4x sem juros"];

export function PaymentInstallmentsStep() {
  const navigate = useNavigate();
  const {
    selectedPaymentMethod,
    setSelectedInstallments,
    selectedPatient,
  } = usePatients();

  useEffect(() => {
    if (!selectedPatient || selectedPaymentMethod !== "credito") {
      navigate("/totem/pagamento/letra", { replace: true });
    }
  }, [selectedPatient, selectedPaymentMethod, navigate]);

  if (!selectedPatient || selectedPaymentMethod !== "credito") {
    return null;
  }

  return (
    <StepLayout
      title="Parcelamento"
      subtitle="Escolha a quantidade de parcelas"
    >
      <div className="flex flex-col gap-4">
        {OPTIONS.map((option) => (
          <Button
            key={option}
            onClick={() => {
              setSelectedInstallments(option);
              navigate("/totem/pagamento/andamento");
            }}
          >
            {option}
          </Button>
        ))}
      </div>

      <Button
        variant="ghost"
        onClick={() => navigate("/totem/pagamento/metodo")}
      >
        Cancelar
      </Button>
    </StepLayout>
  );
}

