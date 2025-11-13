import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SidebarSuite } from "./SidebarSuite";
import { CRMBackdrop } from "./CRMBackdrop";
const backgroundClasses = {
    sand: "bg-[#EDE7E3]",
    marine: "bg-[#16697A]",
    white: "bg-white",
};
export function ExperienceShell({ children, sidebar, background = "sand", showSidebar = true, showBackdrop = true, }) {
    const wrapperClass = backgroundClasses[background] ?? backgroundClasses.sand;
    return (_jsxs("div", { className: `relative min-h-screen ${wrapperClass}`, children: [showSidebar && showBackdrop && _jsx(CRMBackdrop, {}), _jsxs("div", { className: `relative z-10 mx-auto flex w-full max-w-6xl gap-6 px-4 py-8 ${showSidebar ? "flex-col lg:flex-row" : "flex-col"} lg:py-12`, children: [_jsx("div", { className: "flex-1", children: children }), showSidebar && (_jsx("div", { className: "w-full lg:w-[360px]", children: sidebar ?? _jsx(SidebarSuite, {}) }))] })] }));
}
