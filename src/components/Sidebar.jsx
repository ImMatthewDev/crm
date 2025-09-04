import { useState } from "react";
import { Home, Folder, Users, CreditCard, Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Dashboard", icon: <Home size={18} /> },
    { to: "/proyectos", label: "Proyectos", icon: <Folder size={18} /> },
    { to: "/clientes", label: "Clientes", icon: <Users size={18} /> },
    { to: "/pagos", label: "Pagos", icon: <CreditCard size={18} /> },
  ];

  return (
    <>
      {/* Botón menú móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg"
        onClick={() => setOpen(!open)}
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-40
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="p-4 font-bold text-xl border-b">Panel</div>
        <nav className="flex flex-col p-2 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              onClick={() => setOpen(false)} // cerrar en móvil
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
