import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import DroneStatus from "@/pages/DroneStatus";
import SensorPreview from "@/pages/SensorPreview";
import Analytics from "@/pages/Analytics";
import Configuration from "@/pages/Configuration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/drone-status" element={<DroneStatus />} />
          <Route path="/sensor-preview" element={<SensorPreview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/configuration" element={<Configuration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
