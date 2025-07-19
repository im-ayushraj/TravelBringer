import { Routes, Route } from "react-router-dom";
import Terms from "../pages/Terms";
import Privacy from "../pages/Privacy";
import Conditions from "../pages/Conditions";

export default function LegalRoutes() {
  return (
    <Routes>
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/conditions" element={<Conditions />} />
    </Routes>
  );
}
