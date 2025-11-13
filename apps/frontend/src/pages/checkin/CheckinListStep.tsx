import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { maskPatientName } from "../../utils/formatters";

export function CheckinListStep() {
  const navigate = useNavigate();
  const { patients, selectedCheckinLetter, selectPatient, clearSelection } =
    usePatients();

  useEffect(() => {
    if (!selectedCheckinLetter) {
      navigate("/totem/checkin/letra", { replace: true });
    } else {
      clearSelection();
    }
  }, [selectedCheckinLetter, navigate, clearSelection]);

  if (!selectedCheckinLetter) {
    return null;
  }

  const filtered = patients.filter(
    (patient) =>
      patient.statusCheckin === "pendente" &&
      patient.nomeCompleto
        .toLocaleUpperCase()
        .startsWith(selectedCheckinLetter),
  );

  return (
    <StepLayout
      title="Resultados da busca"
      subtitle="Encontre seu nome na lista"
    >
      <p className="text-center text-base text-slate-500">
        Check-ins já realizados não aparecem aqui.
      </p>

      <div className="flex flex-col gap-4">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-6 text-center text-slate-500">
            Nenhum paciente pendente encontrado para a letra{" "}
            <strong>{selectedCheckinLetter}</strong>.
          </div>
        )}

        {filtered.map((patient) => (
          <button
            key={patient.id}
            type="button"
            className="rounded-2xl border-2 border-slate-200 bg-white px-6 py-5 text-left text-2xl font-semibold capitalize text-slate-900 transition hover:border-slate-400"
            onClick={() => {
              selectPatient(patient.id);
              navigate("/totem/checkin/confirmar");
            }}
          >
            {maskPatientName(patient.nomeCompleto)}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <Button
          variant="secondary"
          onClick={() => navigate("/totem/checkin/telefone")}
        >
          Não encontro meu nome
        </Button>
        <Button variant="ghost" onClick={() => navigate("/totem")}>
          Cancelar
        </Button>
      </div>
    </StepLayout>
  );
}

