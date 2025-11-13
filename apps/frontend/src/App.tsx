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
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/totem" element={<MenuPage />} />

      <Route path="/totem/checkin/letra" element={<CheckinLetterStep />} />
      <Route path="/totem/checkin/lista" element={<CheckinListStep />} />
      <Route path="/totem/checkin/telefone" element={<CheckinPhoneStep />} />
      <Route path="/totem/checkin/confirmar" element={<CheckinConfirmStep />} />
      <Route path="/totem/checkin/foto" element={<CheckinPhotoStep />} />
      <Route path="/totem/checkin/sucesso" element={<CheckinSuccessStep />} />

      <Route path="/totem/pagamento/letra" element={<PaymentLetterStep />} />
      <Route path="/totem/pagamento/lista" element={<PaymentListStep />} />
      <Route path="/totem/pagamento/confirmar" element={<PaymentConfirmStep />} />
      <Route path="/totem/pagamento/metodo" element={<PaymentMethodStep />} />
      <Route
        path="/totem/pagamento/parcelas"
        element={<PaymentInstallmentsStep />}
      />
      <Route
        path="/totem/pagamento/andamento"
        element={<PaymentProcessingStep />}
      />
      <Route path="/totem/pagamento/sucesso" element={<PaymentSuccessStep />} />

      <Route path="/app" element={<MonitorAppPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
