import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ExperienceShell } from "../components/layout/ExperienceShell";

const screens = [
  {
    id: "totem",
    title: "Ver Totem",
    description:
      "Simule o fluxo físico do paciente: check-in, foto e pagamento direto no totem.",
    highlight: "Recepção · Totem 03",
    path: "/totem",
  },
  {
    id: "app",
    title: "Ver App",
    description:
      "Acompanhe o CRM da equipe com alertas do totem, filas e confirmações em tempo real.",
    highlight: "Backoffice · CRM Horizon",
    path: "/app",
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <ExperienceShell background="sand" showSidebar={false} showBackdrop={false}>
      <div className="rounded-[32px] border border-brand-mist/40 bg-white px-8 py-12 text-brand-dark shadow-lg lg:px-14">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.6em] text-brand-marine/70">
            Ambiente demonstrativo RVR
          </p>
          <h1 className="mt-4 text-4xl font-black tracking-tight lg:text-5xl">
            Escolha o modo de visualização
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-lg text-brand-dark/70">
            A mesma base de dados alimenta o totem físico para pacientes e o
            aplicativo de monitoramento usado pela equipe.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {screens.map((screen) => (
            <div
              key={screen.id}
              className="rounded-[28px] border border-brand-sand bg-brand-sand/70 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-brand-marine/70">
                {screen.highlight}
              </p>
              <h2 className="mt-4 text-3xl font-black text-brand-marine">
                {screen.title}
              </h2>
              <p className="mt-2 text-sm text-brand-dark/80">
                {screen.description}
              </p>

              <Button
                className="mt-8"
                onClick={() => navigate(screen.path)}
                variant={screen.id === "app" ? "secondary" : "primary"}
              >
                Acessar
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs uppercase tracking-[0.5em] text-brand-marine/70">
          Totem e aplicativo sincronizados via PatientsContext
        </p>
      </div>
    </ExperienceShell>
  );
}
