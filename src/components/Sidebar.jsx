import { Link } from "react-router-dom";
import { Home, FolderKanban, Users, CreditCard } from "lucide-react";

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
    >
      <div className="p-4 border-b">
        <h2 className="text-2xl font-bold text-gray-800">Panel</h2>
      </div>
      <nav className="flex flex-col p-4 gap-2">
        <Link to="/" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
          <Home className="w-5 h-5" /> Dashboard
        </Link>
        <Link to="/proyectos" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
          <FolderKanban className="w-5 h-5" /> Proyectos
        </Link>
        <Link to="/clientes" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
          <Users className="w-5 h-5" /> Clientes
        </Link>
        <Link to="/pagos" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 text-gray-700">
          <CreditCard className="w-5 h-5" /> Pagos
        </Link>
      </nav>
    </aside>
  );
}
