import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { usePatients } from "../context/PatientsContext";
import { ExperienceShell } from "../components/layout/ExperienceShell";

const primaryActions = [
  {
    label: "Acabei de chegar!",
    description: "Check-in guiado • foto e alerta ao time",
    path: "/totem/checkin/letra",
  },
];

export function MenuPage() {
  const navigate = useNavigate();
  const { resetAll } = usePatients();

  const goTo = (path: string) => {
    resetAll();
    navigate(path);
  };

  const exitToLanding = () => {
    resetAll();
    navigate("/");
  };

  return (
    <ExperienceShell showSidebar={false} showBackdrop={false}>
      <div className="relative rounded-[32px] border border-brand-mist/50 bg-white px-8 py-10 text-brand-dark shadow-md lg:px-14">
        <button
          type="button"
          onClick={exitToLanding}
          className="absolute right-4 top-4 h-4 w-4 rounded-full border border-brand-mist/40 bg-brand-sand/80 opacity-20 transition hover:opacity-80 focus:opacity-80 focus:outline-none"
          title="Voltar para a escolha inicial"
        >
          <span className="sr-only">Sair do totem</span>
        </button>

        <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-full border border-brand-mist/40 bg-white p-3 text-brand-marine shadow-sm hover:bg-brand-sand/80"
              title="Voltar para o menu inicial"
            >
              <span className="inline-block text-xl leading-none">⌂</span>
            </button>
            <div>
              <p className="text-xs uppercase tracking-[0.6em] text-brand-marine/70">
                Totem
              </p>
              <h1 className="text-5xl font-black tracking-tight">
                Totem de orientação
              </h1>
              <p className="mt-3 text-lg text-brand-dark/70">
                Escolha como deseja continuar seu atendimento. Simples, rápido e
                direto no totem.
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-brand-sand/80 px-6 py-4 text-sm font-semibold text-brand-marine/80">
            Totem 03 · Recepção principal
            <span className="ml-2 inline-flex items-center text-green-500">
              ● Disponível
            </span>
          </div>
        </header>

        <div className="mt-8 grid gap-6">
          {primaryActions.map((action) => (
            <div
              key={action.label}
              className="rounded-[28px] border border-brand-sand bg-brand-sand/70 p-6"
            >
              <h2 className="text-3xl font-black text-brand-marine">
                {action.label}
              </h2>
              <p className="mt-2 text-sm text-brand-dark/70">
                {action.description}
              </p>
              <Button className="mt-6" onClick={() => goTo(action.path)}>
                Iniciar
              </Button>
            </div>
          ))}
        </div>

        <section className="mt-10 rounded-[28px] border border-brand-sand bg-white px-6 py-6">
          <p className="text-xs uppercase tracking-[0.5em] text-brand-marine">
            Passo a passo
          </p>
          <ol className="mt-4 grid gap-4 text-sm text-brand-dark/80 md:grid-cols-2">
            {[
              "1. Escolha a primeira letra do nome ou informe telefone.",
              "2. Confirme médico, especialidade e sua identidade.",
              "3. Faça o check-in com foto e vá para a sala indicada.",
              "4. Simule o pagamento e acompanhe pelo painel.",
            ].map((item) => (
              <li
                key={item}
                className="rounded-full border border-brand-mist/40 px-4 py-2"
              >
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-brand-dark/70">
            Após registrar a foto, o próprio totem apresentará a etapa de pagamento.
            Não é necessário escolher essa opção agora.
          </p>
        </section>
      </div>
    </ExperienceShell>
  );
}
