import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone } from "../../utils/formatters";

export function CheckinConfirmStep() {
  const navigate = useNavigate();
  const { selectedPatient } = usePatients();

  useEffect(() => {
    if (!selectedPatient) {
      navigate("/totem/checkin/letra", { replace: true });
    }
  }, [selectedPatient, navigate]);

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
      title="Confirme seus dados"
      subtitle="Podemos avisar que você chegou?"
      background="blue"
    >
      <div className="rounded-3xl bg-brand-sand/70 px-8 py-10 shadow-inner">
        <div className="flex flex-col gap-1 text-brand-dark">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-marine/70">
            Paciente
          </p>
          <p className="text-3xl font-black uppercase tracking-wide text-brand-marine">
            {selectedPatient.nomeCompleto}
          </p>
          <p className="text-sm text-brand-dark/70">
            Telefone: {formatPhone(selectedPatient.telefone)}
          </p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand-dark">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
              Consulta agendada
            </p>
            <p className="text-lg font-semibold">
              {appointment.tipo} • {appointment.hora}
            </p>
            <p className="text-xs text-brand-dark/70">{appointment.data}</p>
          </div>
          <div className="rounded-2xl bg-white px-4 py-3 text-sm text-brand-dark">
            <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
              Endereço da clínica
            </p>
            <p className="text-lg font-semibold text-brand-marine">
              {appointment.endereco}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white px-4 py-3 text-sm text-brand-dark">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-marine/70">
            Profissional
          </p>
          <p className="text-lg font-semibold text-brand-marine">
            Dra. {selectedPatient.medico} • {selectedPatient.especialidade}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate("/totem/checkin/lista")}
          fullWidth={false}
          className="self-center border-white/60 text-white hover:border-white"
        >
          Voltar
        </Button>
        <Button onClick={() => navigate("/totem/checkin/foto")}>Confirmar</Button>
      </div>
    </StepLayout>
  );
}
