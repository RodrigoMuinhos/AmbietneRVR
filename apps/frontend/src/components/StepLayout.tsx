import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ExperienceShell } from "./layout/ExperienceShell";
import { usePatients } from "../context/PatientsContext";

type StepLayoutProps = {
  title: string;
  subtitle?: string;
  background?: "yellow" | "blue" | "white";
  children: ReactNode;
  footer?: ReactNode;
  showExitButton?: boolean;
};

const accentStyles = {
  yellow: {
    accent: "text-brand-sun",
    subtitle: "text-brand-dark/70",
    border: "border-brand-sun/40",
    highlight: "bg-brand-sun",
  },
  blue: {
    accent: "text-brand-marine",
    subtitle: "text-brand-dark/70",
    border: "border-brand-mist/50",
    highlight: "bg-brand-mist",
  },
  white: {
    accent: "text-brand-marine",
    subtitle: "text-brand-dark/70",
    border: "border-brand-mist/40",
    highlight: "bg-brand-marine",
  },
};

export function StepLayout({
  title,
  subtitle,
  background = "yellow",
  children,
  footer,
  showExitButton = true,
}: StepLayoutProps) {
  const styles = accentStyles[background] ?? accentStyles.yellow;
  const navigate = useNavigate();
  const { resetAll } = usePatients();

  return (
    <ExperienceShell background="white" showSidebar={false} showBackdrop={false}>
      <div className="relative flex min-h-[calc(100vh-8rem)] flex-col rounded-[28px] border border-brand-mist/40 bg-white px-8 py-10 text-brand-dark shadow-md lg:px-12">
        {showExitButton && (
          <button
            type="button"
            onClick={() => {
              resetAll();
              navigate("/");
            }}
            className="absolute right-4 top-4 h-4 w-4 rounded-full border border-brand-mist/40 bg-brand-sand/80 opacity-20 transition hover:opacity-80 focus:opacity-80 focus:outline-none"
            title="Sair do totem"
          >
            <span className="sr-only">Voltar para a escolha inicial</span>
          </button>
        )}

        <header className="flex flex-col gap-3 text-left">
          <p className={`text-xs uppercase tracking-[0.6em] ${styles.accent}`}>
            Clínica Horizonte · Totem
          </p>
          <div className={`h-1 w-14 rounded-full ${styles.highlight}`} />
          <h1 className="text-4xl font-black tracking-tight lg:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className={`text-lg font-medium ${styles.subtitle}`}>{subtitle}</p>
          )}
        </header>

        <div className="mt-8 flex flex-1 flex-col gap-8 text-lg">
          {children}
        </div>

        {footer && (
          <div className={`mt-10 border-t ${styles.border} pt-6`}>{footer}</div>
        )}
      </div>
    </ExperienceShell>
  );
}

