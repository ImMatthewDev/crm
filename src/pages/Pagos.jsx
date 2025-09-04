import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchPagos = async () => {
      const snapshot = await getDocs(collection(db, "pagos"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPagos(data);
    };
    fetchPagos();
  }, []);

  const handleEstadoChange = async (id, nuevoEstado) => {
    const pagoRef = doc(db, "pagos", id);
    await updateDoc(pagoRef, { estado: nuevoEstado });
    setPagos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Pagos</h1>
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Monto</th>
            <th className="py-2 px-4 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((pago) => (
            <tr key={pago.id}>
              <td className="py-2 px-4 border-b">{pago.cliente}</td>
              <td className="py-2 px-4 border-b">${pago.monto}</td>
              <td className="py-2 px-4 border-b">
                <select
                  value={pago.estado}
                  onChange={(e) => handleEstadoChange(pago.id, e.target.value)}
                  className="border rounded px-2 py-1"
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
  );
}
