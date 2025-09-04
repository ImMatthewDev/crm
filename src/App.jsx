import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Proyectos from "./pages/Proyectos";
import Clientes from "./pages/Clientes";
import Pagos from "./pages/Pagos";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-h-screen bg-gray-50 md:ml-64">
          <Header />
          <main className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/pagos" element={<Pagos />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
