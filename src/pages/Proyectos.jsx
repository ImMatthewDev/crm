import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: "", cliente: "" });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "proyectos"), (snapshot) => {
      setProyectos(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  const addProyecto = async () => {
    if (!nuevo.nombre || !nuevo.cliente) return;
    await addDoc(collection(db, "proyectos"), nuevo);
    setNuevo({ nombre: "", cliente: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre del proyecto"
          className="border p-2 rounded w-1/3"
          value={nuevo.nombre}
          onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Cliente"
          className="border p-2 rounded w-1/3"
          value={nuevo.cliente}
          onChange={(e) => setNuevo({ ...nuevo, cliente: e.target.value })}
        />
        <button
          onClick={addProyecto}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      <ul className="space-y-2">
        {proyectos.map((p) => (
          <li key={p.id} className="border p-3 rounded shadow">
            <strong>{p.nombre}</strong> — {p.cliente}
          </li>
        ))}
      </ul>
    </div>
  );
}
