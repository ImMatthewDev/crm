import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Suscripciones() {
  const [suscripciones, setSuscripciones] = useState([]);
  const [form, setForm] = useState({ cliente: "", fechaInicio: "", duracionMeses: 1 });

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "suscripciones"));
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSuscripciones(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "suscripciones"), form);
    setForm({ cliente: "", fechaInicio: "", duracionMeses: 1 });
    window.location.reload(); // refrescar lista rápido
  };

  const calcularDiasRestantes = (fechaInicio, duracionMeses) => {
    const inicio = new Date(fechaInicio);
    const fin = new Date(inicio);
    fin.setMonth(fin.getMonth() + Number(duracionMeses));
    const hoy = new Date();
    return Math.ceil((fin - hoy) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestión de Suscripciones</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 flex gap-4 flex-wrap items-end bg-gray-50 p-4 rounded-lg shadow"
      >
        <div>
          <label className="block text-sm">Cliente</label>
          <input
            type="text"
            className="border rounded px-3 py-1"
            value={form.cliente}
            onChange={(e) => setForm({ ...form, cliente: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm">Fecha inicio</label>
          <input
            type="date"
            className="border rounded px-3 py-1"
            value={form.fechaInicio}
            onChange={(e) => setForm({ ...form, fechaInicio: e.target.value })}
            required
          />
        </div>
        <div>
          <label className="block text-sm">Duración (meses)</label>
          <input
            type="number"
            min="1"
            className="border rounded px-3 py-1 w-24"
            value={form.duracionMeses}
            onChange={(e) => setForm({ ...form, duracionMeses: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Crear
        </button>
      </form>

      {/* Tabla */}
      <table className="min-w-full bg-white border rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Inicio</th>
            <th className="py-2 px-4 border-b">Duración</th>
            <th className="py-2 px-4 border-b">Días restantes</th>
          </tr>
        </thead>
        <tbody>
          {suscripciones.map((s) => {
            const dias = calcularDiasRestantes(s.fechaInicio, s.duracionMeses);
            return (
              <tr key={s.id}>
                <td className="py-2 px-4 border-b">{s.cliente}</td>
                <td className="py-2 px-4 border-b">{s.fechaInicio}</td>
                <td className="py-2 px-4 border-b">{s.duracionMeses} meses</td>
                <td
                  className={`py-2 px-4 border-b ${
                    dias <= 0 ? "text-red-600" : dias < 30 ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {dias <= 0 ? "Expirada" : `${dias} días`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
