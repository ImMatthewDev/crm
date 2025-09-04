import { Menu } from "lucide-react";

export default function Header({ toggleSidebar }) {
  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:ml-64 fixed w-full top-0 z-30">
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">CRM Personal</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:block text-gray-600">Bienvenido 👋</span>
        <img
          src="https://ui-avatars.com/api/?name=Admin"
          alt="avatar"
          className="w-8 h-8 rounded-full border"
        />
      </div>
    </header>
  );
}
