import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Pagos from "./pages/Pagos";
import Proyectos from "./pages/Proyectos";
import Suscripciones from "./pages/Suscripciones"; // 👈 Nueva página
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-64 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/suscripciones" element={<Suscripciones />} /> {/* 👈 */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
