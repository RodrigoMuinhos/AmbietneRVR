import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { usePatients } from "../../context/PatientsContext";

export function CheckinPhotoStep() {
  const navigate = useNavigate();
  const { selectedPatient, updatePatient } = usePatients();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!selectedPatient) {
      navigate("/totem/checkin/letra", { replace: true });
      return;
    }

    if (countdown === 0 && selectedPatient) {
      updatePatient(selectedPatient.id, { fotoTirada: true });
      navigate("/totem/checkin/sucesso");
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, selectedPatient, updatePatient, navigate]);

  if (!selectedPatient) {
    return null;
  }

  return (
    <StepLayout title="Sorria! 😀" subtitle="Hora de registrar sua presença.">
      <div className="flex flex-col items-center gap-8">
        <div className="flex h-72 w-72 items-center justify-center rounded-3xl border-4 border-dashed border-slate-300 bg-white shadow-inner">
          <span className="text-6xl font-black text-slate-400">
            {countdown || "✔"}
          </span>
        </div>
        <p className="text-center text-xl text-slate-600">
          Ajuste-se na frente do totem e mantenha o sorriso até o clique.
        </p>
      </div>
    </StepLayout>
  );
}

