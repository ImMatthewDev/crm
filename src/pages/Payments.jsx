import { useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([
    { id: 1, cliente: "Juan Pérez", monto: 120, estado: "Pendiente" },
    { id: 2, cliente: "María Gómez", monto: 300, estado: "Pagado" },
    { id: 3, cliente: "Carlos Ruiz", monto: 80, estado: "Atrasado" },
  ]);

  const handleEstadoChange = (id, nuevoEstado) => {
    setPayments((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, estado: nuevoEstado } : p
      )
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gestión de Pagos</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-700">
          <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Monto</th>
              <th className="px-6 py-3">Estado</th>
              <th className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr
                key={p.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{p.cliente}</td>
                <td className="px-6 py-4">${p.monto}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      p.estado === "Pagado"
                        ? "bg-green-100 text-green-700"
                        : p.estado === "Pendiente"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={p.estado}
                    onChange={(e) =>
                      handleEstadoChange(p.id, e.target.value)
                    }
                    className="border rounded-lg px-2 py-1 text-sm focus:ring focus:ring-blue-300"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Atrasado">Atrasado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
