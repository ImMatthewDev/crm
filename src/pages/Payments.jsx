import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // 👈 asegúrate de importar tu firebase.js

const Payments = () => {
  const [payments, setPayments] = useState([]);

  // 🔹 Obtener pagos desde Firebase
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        const data = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setPayments(data);
      } catch (error) {
        console.error("Error al cargar pagos:", error);
      }
    };

    fetchPayments();
  }, []);

  // 🔹 Cambiar estado en Firebase
  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      const paymentRef = doc(db, "payments", id);
      await updateDoc(paymentRef, { estado: nuevoEstado });

      // Actualizar en el estado local
      setPayments((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, estado: nuevoEstado } : p
        )
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
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
              <tr key={p.id} className="border-b hover:bg-gray-50 transition">
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
