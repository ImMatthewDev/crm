import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [nuevo, setNuevo] = useState({ cliente: "", monto: "", estado: "pendiente" });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "pagos"), (snapshot) => {
      setPagos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addPago = async () => {
    if (!nuevo.cliente || !nuevo.monto) return;
    await addDoc(collection(db, "pagos"), nuevo);
    setNuevo({ cliente: "", monto: "", estado: "pendiente" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pagos</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Cliente"
          className="border p-2 rounded w-1/3"
          value={nuevo.cliente}
          onChange={(e) => setNuevo({ ...nuevo, cliente: e.target.value })}
        />
        <input
          type="number"
          placeholder="Monto"
          className="border p-2 rounded w-1/3"
          value={nuevo.monto}
          onChange={(e) => setNuevo({ ...nuevo, monto: e.target.value })}
        />
        <button
          onClick={addPago}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Cliente</th>
            <th className="border p-2">Monto</th>
            <th className="border p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {pagos.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.cliente}</td>
              <td className="border p-2">${p.monto}</td>
              <td className="border p-2">{p.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
