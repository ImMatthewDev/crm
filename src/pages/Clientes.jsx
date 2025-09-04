import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", contacto: "" });

  // Escucha en tiempo real
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "clientes"), (snapshot) => {
      setClientes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  // Guardar cliente
  const handleAddCliente = async () => {
    if (!nuevoCliente.nombre || !nuevoCliente.contacto) return;
    await addDoc(collection(db, "clientes"), nuevoCliente);
    setNuevoCliente({ nombre: "", contacto: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clientes</h1>

      {/* Formulario agregar cliente */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nombre"
          className="border p-2 rounded w-1/3"
          value={nuevoCliente.nombre}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contacto"
          className="border p-2 rounded w-1/3"
          value={nuevoCliente.contacto}
          onChange={(e) => setNuevoCliente({ ...nuevoCliente, contacto: e.target.value })}
        />
        <button
          onClick={handleAddCliente}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agregar
        </button>
      </div>

      {/* Tabla de clientes */}
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Contacto</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.nombre}</td>
              <td className="border p-2">{c.contacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
