import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { MenuPage } from "./pages/MenuPage";
import { CheckinLetterStep } from "./pages/checkin/CheckinLetterStep";
import { CheckinListStep } from "./pages/checkin/CheckinListStep";
import { CheckinPhoneStep } from "./pages/checkin/CheckinPhoneStep";
import { CheckinConfirmStep } from "./pages/checkin/CheckinConfirmStep";
import { CheckinPhotoStep } from "./pages/checkin/CheckinPhotoStep";
import { CheckinSuccessStep } from "./pages/checkin/CheckinSuccessStep";
import { PaymentLetterStep } from "./pages/payment/PaymentLetterStep";
import { PaymentListStep } from "./pages/payment/PaymentListStep";
import { PaymentConfirmStep } from "./pages/payment/PaymentConfirmStep";
import { PaymentMethodStep } from "./pages/payment/PaymentMethodStep";
import { PaymentInstallmentsStep } from "./pages/payment/PaymentInstallmentsStep";
import { PaymentProcessingStep } from "./pages/payment/PaymentProcessingStep";
import { PaymentSuccessStep } from "./pages/payment/PaymentSuccessStep";
import { MonitorAppPage } from "./pages/MonitorAppPage";
export default function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(LandingPage, {}) }), _jsx(Route, { path: "/totem", element: _jsx(MenuPage, {}) }), _jsx(Route, { path: "/totem/checkin/letra", element: _jsx(CheckinLetterStep, {}) }), _jsx(Route, { path: "/totem/checkin/lista", element: _jsx(CheckinListStep, {}) }), _jsx(Route, { path: "/totem/checkin/telefone", element: _jsx(CheckinPhoneStep, {}) }), _jsx(Route, { path: "/totem/checkin/confirmar", element: _jsx(CheckinConfirmStep, {}) }), _jsx(Route, { path: "/totem/checkin/foto", element: _jsx(CheckinPhotoStep, {}) }), _jsx(Route, { path: "/totem/checkin/sucesso", element: _jsx(CheckinSuccessStep, {}) }), _jsx(Route, { path: "/totem/pagamento/letra", element: _jsx(PaymentLetterStep, {}) }), _jsx(Route, { path: "/totem/pagamento/lista", element: _jsx(PaymentListStep, {}) }), _jsx(Route, { path: "/totem/pagamento/confirmar", element: _jsx(PaymentConfirmStep, {}) }), _jsx(Route, { path: "/totem/pagamento/metodo", element: _jsx(PaymentMethodStep, {}) }), _jsx(Route, { path: "/totem/pagamento/parcelas", element: _jsx(PaymentInstallmentsStep, {}) }), _jsx(Route, { path: "/totem/pagamento/andamento", element: _jsx(PaymentProcessingStep, {}) }), _jsx(Route, { path: "/totem/pagamento/sucesso", element: _jsx(PaymentSuccessStep, {}) }), _jsx(Route, { path: "/app", element: _jsx(MonitorAppPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }));
}
