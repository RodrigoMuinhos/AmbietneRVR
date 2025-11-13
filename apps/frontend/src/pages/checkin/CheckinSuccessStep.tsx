import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";

export function CheckinSuccessStep() {
  const navigate = useNavigate();
  const {
    selectedPatient,
    updatePatient,
    resetAll,
    setSelectedPaymentLetter,
  } = usePatients();

  useEffect(() => {
    if (!selectedPatient) {
      navigate("/totem", { replace: true });
      return;
    }

    if (selectedPatient.statusCheckin !== "feito") {
      updatePatient(selectedPatient.id, { statusCheckin: "feito" });
    }
  }, [selectedPatient, updatePatient, navigate]);

  if (!selectedPatient) {
    return null;
  }

  const appointment = selectedPatient.appointment ?? {
    data: "Hoje",
    hora: "15:30",
    endereco: "Rua das Palmeiras, 120 - Centro",
    tipo: "Primeira consulta",
  };

  return (
    <StepLayout
      title="Tudo certo!"
      subtitle="Você confirmou sua chegada."
      background="blue"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <img
          src={selectedPatient.fotoMedico}
          alt={`Foto da médica ${selectedPatient.medico}`}
          className="h-40 w-40 rounded-full border-4 border-white object-cover shadow-lg"
        />
        <div>
          <p className="text-2xl font-semibold">
            Dra. {selectedPatient.medico}
          </p>
          <p className="text-lg text-white/70">
            {selectedPatient.especialidade}
          </p>
        </div>
        <p className="text-xl font-medium text-white/80">
          Em breve você será chamado(a). Obrigado!
        </p>
        <div className="w-full rounded-3xl bg-white px-6 py-4 text-sm text-brand-dark">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
            Detalhes da consulta
          </p>
          <p className="mt-2 font-semibold">
            {appointment.tipo} • {appointment.hora} – {appointment.data}
          </p>
          <p className="text-xs text-brand-dark/70">{appointment.endereco}</p>
        </div>
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
        <Button
          variant="secondary"
          onClick={() => {
            if (selectedPatient) {
              setSelectedPaymentLetter(
                selectedPatient.nomeCompleto.charAt(0).toUpperCase(),
              );
            }
            navigate("/totem/pagamento/confirmar");
          }}
        >
          Ir para pagamento
        </Button>
      </div>
    </StepLayout>
  );
}
