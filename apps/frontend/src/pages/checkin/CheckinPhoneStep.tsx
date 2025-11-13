import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { KeyboardNumeric } from "../../components/KeyboardNumeric";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";
import { formatPhone, normalizePhone } from "../../utils/formatters";

export function CheckinPhoneStep() {
  const navigate = useNavigate();
  const { findPatientByPhone, selectPatient } = usePatients();
  const [phone, setPhone] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleConfirm = () => {
    const normalized = normalizePhone(phone);
    if (normalized.length < 10) {
      setFeedback("Digite o telefone completo com DDD.");
      return;
    }

    const found = findPatientByPhone(phone);
    if (found) {
      selectPatient(found.id);
      setFeedback(null);
      navigate("/totem/checkin/confirmar");
    } else {
      setFeedback("Não encontramos seu cadastro. Verifique os dados.");
    }
  };

  return (
    <StepLayout
      title="Digite seu telefone"
      subtitle="Use o número informado no agendamento."
    >
      <div className="flex flex-col gap-4">
        <div className="rounded-3xl border-2 border-slate-200 bg-white px-6 py-4 text-3xl font-semibold tracking-wide text-slate-900">
          {formatPhone(phone) || "(  ) _____-____"}
        </div>

        {feedback && (
          <p className="text-base font-medium text-rose-600">{feedback}</p>
        )}
      </div>

      <KeyboardNumeric
        onInput={(digit) => {
          setPhone((prev) => {
            const next = normalizePhone(prev + digit).slice(0, 11);
            return next;
          });
        }}
        onDelete={() =>
          setPhone((prev) => prev.slice(0, Math.max(prev.length - 1, 0)))
        }
        onClear={() => setPhone("")}
      />

      <div className="mt-6 flex flex-col gap-4">
        <Button onClick={handleConfirm}>Confirmar telefone</Button>
        <Button variant="ghost" onClick={() => navigate("/totem")}>
          Cancelar
        </Button>
      </div>
    </StepLayout>
  );
}

