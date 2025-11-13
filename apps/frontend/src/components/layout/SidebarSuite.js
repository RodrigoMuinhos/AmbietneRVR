import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ClinicMenu } from "../sidebar/ClinicMenu";
import { QuickGuide } from "../sidebar/QuickGuide";
import { HelpMenu } from "../sidebar/HelpMenu";
import { ChatAssistant } from "../sidebar/ChatAssistant";
export function SidebarSuite() {
    return (_jsxs("div", { className: "flex flex-col gap-4", children: [_jsx(ClinicMenu, {}), _jsx(QuickGuide, {}), _jsx(HelpMenu, {}), _jsx(ChatAssistant, {})] }));
}
