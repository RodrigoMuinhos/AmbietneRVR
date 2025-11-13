import { ReactNode } from "react";
import { SidebarSuite } from "./SidebarSuite";
import { CRMBackdrop } from "./CRMBackdrop";

type ExperienceShellProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  background?: "sand" | "marine" | "white";
  showSidebar?: boolean;
  showBackdrop?: boolean;
};

const backgroundClasses: Record<
  NonNullable<ExperienceShellProps["background"]>,
  string
> = {
  sand: "bg-[#EDE7E3]",
  marine: "bg-[#16697A]",
  white: "bg-white",
};

export function ExperienceShell({
  children,
  sidebar,
  background = "sand",
  showSidebar = true,
  showBackdrop = true,
}: ExperienceShellProps) {
  const wrapperClass = backgroundClasses[background] ?? backgroundClasses.sand;

  return (
    <div className={`relative min-h-screen ${wrapperClass}`}>
      {showSidebar && showBackdrop && <CRMBackdrop />}

      <div
        className={`relative z-10 mx-auto flex w-full max-w-6xl gap-6 px-4 py-8 ${
          showSidebar ? "flex-col lg:flex-row" : "flex-col"
        } lg:py-12`}
      >
        <div className="flex-1">{children}</div>
        {showSidebar && (
          <div className="w-full lg:w-[360px]">
            {sidebar ?? <SidebarSuite />}
          </div>
        )}
      </div>
    </div>
  );
}
