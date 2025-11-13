import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StepLayout } from "../../components/StepLayout";
import { KeyboardLetters } from "../../components/KeyboardLetters";
import { Button } from "../../components/Button";
import { usePatients } from "../../context/PatientsContext";

export function CheckinLetterStep() {
  const navigate = useNavigate();
  const {
    setSelectedCheckinLetter,
    clearSelection,
    selectedCheckinLetter,
    patients,
    selectPatient,
    addPatient,
  } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleVirtualKey = (letter: string) => {
    setSelectedCheckinLetter(letter);
    setSearchTerm((prev) => (prev + letter).trimStart());
    setFeedback(null);
    inputRef.current?.focus();
  };

  const suggestions = useMemo(() => {
    if (!searchTerm) return [];
    const normalized = searchTerm.toLowerCase();
    return patients
      .filter(
        (patient) =>
          patient.statusCheckin === "pendente" &&
          patient.nomeCompleto.toLowerCase().includes(normalized),
      )
      .slice(0, 5);
  }, [patients, searchTerm]);

  const handleSuggestion = (patientId: string) => {
    selectPatient(patientId);
    const patient = patients.find((item) => item.id === patientId);
    if (patient?.nomeCompleto) {
      setSelectedCheckinLetter(patient.nomeCompleto.charAt(0).toUpperCase());
    }
    navigate("/totem/checkin/confirmar");
  };

  const handleCreate = () => {
    if (searchTerm.trim().length < 3) {
      setFeedback("Informe pelo menos 3 caracteres para cadastrar.");
      return;
    }
    const newPatient = addPatient(searchTerm.trim());
    selectPatient(newPatient.id);
    setSelectedCheckinLetter(newPatient.nomeCompleto.charAt(0).toUpperCase());
    navigate("/totem/checkin/confirmar");
  };

  return (
    <StepLayout title="Check-in" subtitle="Qual é a primeira letra do seu nome?">
      <div className="rounded-3xl border border-brand-mist/40 bg-white/80 px-6 py-5 shadow-sm">
        <p className="text-sm font-semibold text-brand-marine uppercase tracking-[0.3em]">
          Busca rápida
        </p>
        <p className="mt-1 text-sm text-brand-dark/70">
          Digite seu nome usando o teclado abaixo ou informe tudo manualmente.
        </p>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setFeedback(null);
          }}
          placeholder="Ex.: Bruna Siqueira Andrade"
          className="mt-3 w-full rounded-2xl border border-brand-mist/40 px-4 py-3 text-base focus:border-brand-marine focus:outline-none"
        />
        {feedback && (
          <p className="mt-2 text-sm text-rose-500">{feedback}</p>
        )}
        {suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            {suggestions.map((patient) => (
              <button
                key={patient.id}
                type="button"
                onClick={() => handleSuggestion(patient.id)}
                className="w-full rounded-2xl border border-brand-mist/30 px-4 py-2 text-left text-sm font-semibold text-brand-dark transition hover:bg-brand-sand/70"
              >
                {patient.nomeCompleto}
              </button>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-brand-dark/60">
            Não encontrou? Cadastre rapidamente.
          </span>
          <Button
            type="button"
            fullWidth={false}
            variant="secondary"
            onClick={handleCreate}
          >
            Cadastrar nome
          </Button>
        </div>
      </div>

      <KeyboardLetters
        onSelect={handleVirtualKey}
        selectedLetter={selectedCheckinLetter}
      />

      <div className="mt-6 text-center text-base text-slate-500">
        Caso não saiba o nome completo usado no agendamento, avance pela opção
        “Não encontro meu nome” na próxima tela.
      </div>

      <div className="mt-auto flex justify-center">
        <Button
          variant="secondary"
          fullWidth={false}
          onClick={() => navigate("/totem")}
        >
          Voltar ao menu
        </Button>
      </div>
    </StepLayout>
  );
}
