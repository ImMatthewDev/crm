import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const formatCurrency = (n) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(
    Number(n || 0)
  );

const formatDate = (d) => {
  if (!d) return "-";
  try {
    return new Date(d).toLocaleDateString();
  } catch {
    return d;
  }
};

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [form, setForm] = useState({
    cliente: "",
    monto: "",
    vencimiento: "",
    estado: "Pendiente",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "pagos"), orderBy("vencimiento"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPagos(data);
    });
    return () => unsub();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.cliente || !form.monto) return;
    setLoadingAdd(true);
    try {
      await addDoc(collection(db, "pagos"), {
        cliente: form.cliente,
        monto: Number(form.monto),
        vencimiento: form.vencimiento || null,
        estado: form.estado || "Pendiente",
        createdAt: new Date().toISOString(),
      });
      setForm({ cliente: "", monto: "", vencimiento: "", estado: "Pendiente" });
    } catch (err) {
      console.error("Error al crear pago:", err);
      alert("Error al crear pago. Revisa la consola.");
    } finally {
      setLoadingAdd(false);
    }
  };

  const handleChangeEstado = async (id, nuevoEstado) => {
    setUpdatingId(id);
    try {
      const ref = doc(db, "pagos", id);
      await updateDoc(ref, { estado: nuevoEstado });
      setPagos((prev) =>
        prev.map((p) => (p.id === id ? { ...p, estado: nuevoEstado } : p))
      );
    } catch (err) {
      console.error("Error actualizando estado:", err);
      alert("No se pudo actualizar el estado.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar este pago? Esta acción no se puede deshacer.")) return;
    try {
      await deleteDoc(doc(db, "pagos", id));
    } catch (err) {
      console.error("Error eliminando pago:", err);
      alert("No se pudo eliminar el pago.");
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Pagos</h1>

      {/* Formulario */}
      <form
        onSubmit={handleAdd}
        className="bg-white shadow rounded-lg p-4 mb-6 grid gap-3 grid-cols-1 md:grid-cols-4"
      >
        <div>
          <label className="block text-sm text-gray-600 mb-1">Cliente</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={form.cliente}
            onChange={(e) => setForm({ ...form, cliente: e.target.value })}
            placeholder="Nombre del cliente"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Monto</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={form.monto}
            onChange={(e) => setForm({ ...form, monto: e.target.value })}
            placeholder="0"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Vencimiento</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={form.vencimiento}
            onChange={(e) => setForm({ ...form, vencimiento: e.target.value })}
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loadingAdd}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
          >
            {loadingAdd ? "Guardando..." : "Agregar"}
          </button>
        </div>
      </form>

      {/* Cards móviles */}
      <div className="space-y-4 md:hidden">
        {pagos.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col gap-3"
          >
            <div>
              <h2 className="font-semibold text-lg">{p.cliente}</h2>
              <p className="text-gray-700">{formatCurrency(p.monto)}</p>
              <p className="text-sm text-gray-500">
                Vence: {formatDate(p.vencimiento)}
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <select
                value={p.estado}
                onChange={(e) => handleChangeEstado(p.id, e.target.value)}
                disabled={updatingId === p.id}
                className="border rounded px-3 py-2"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Pagado">Pagado</option>
                <option value="Atrasado">Atrasado</option>
              </select>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
        {pagos.length === 0 && (
          <p className="text-center text-gray-500">No hay pagos aún.</p>
        )}
      </div>

      {/* Tabla desktop */}
      <div className="hidden md:block bg-white rounded-lg shadow">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Monto</th>
              <th className="px-4 py-3">Vencimiento</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-3">{p.cliente}</td>
                <td className="px-4 py-3">{formatCurrency(p.monto)}</td>
                <td className="px-4 py-3">{formatDate(p.vencimiento)}</td>
                <td className="px-4 py-3">
                  <select
                    value={p.estado}
                    onChange={(e) => handleChangeEstado(p.id, e.target.value)}
                    disabled={updatingId === p.id}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="Pagado">Pagado</option>
                    <option value="Atrasado">Atrasado</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {pagos.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No hay pagos aún.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
