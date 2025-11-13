import { ClinicMenu } from "../sidebar/ClinicMenu";
import { QuickGuide } from "../sidebar/QuickGuide";
import { HelpMenu } from "../sidebar/HelpMenu";
import { ChatAssistant } from "../sidebar/ChatAssistant";

export function SidebarSuite() {
  return (
    <div className="flex flex-col gap-4">
      <ClinicMenu />
      <QuickGuide />
      <HelpMenu />
      <ChatAssistant />
    </div>
  );
}

