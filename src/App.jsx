// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Proyectos from "./pages/Proyectos";
import Pagos from "./pages/Pagos";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        {/* Sidebar fijo a la izquierda */}
        <Sidebar />

        {/* Contenedor principal */}
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50 p-6 ml-64">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/proyectos" element={<Proyectos />} />
              <Route path="/pagos" element={<Pagos />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
