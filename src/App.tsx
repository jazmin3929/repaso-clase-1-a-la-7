
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarraNavegacion from "./components/BarraNavegacion/BarraNavegacion";
import SeccionHero from "./components/SeccionHero/SeccionHero";
import Tareas from "./pages/Tareas";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />

      <Routes>
        <Route path="/" element={<SeccionHero />} />
        <Route path="/tareas" element={<Tareas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
