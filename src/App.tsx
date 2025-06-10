import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import DroneStatus from "@/pages/DroneStatus";
import SensorPreview from "@/pages/SensorPreview";
import Analytics from "@/pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drone-status" element={<DroneStatus />} />
          <Route path="/sensor-preview" element={<SensorPreview />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
