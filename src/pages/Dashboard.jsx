// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);
  const [proyectos, setProyectos] = useState([]);
  const [pagos, setPagos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const clientesSnap = await getDocs(collection(db, "clientes"));
      setClientes(clientesSnap.docs.map(doc => doc.data()));

      const proyectosSnap = await getDocs(collection(db, "proyectos"));
      setProyectos(proyectosSnap.docs.map(doc => doc.data()));

      const pagosSnap = await getDocs(collection(db, "pagos"));
      setPagos(pagosSnap.docs.map(doc => doc.data()));
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resumen</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-gray-600">Clientes</h2>
          <p className="text-3xl font-bold">{clientes.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-gray-600">Proyectos</h2>
          <p className="text-3xl font-bold">{proyectos.length}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold text-gray-600">Pagos pendientes</h2>
          <p className="text-3xl font-bold">
            {pagos.filter(p => !p.pagado).length}
          </p>
        </div>
      </div>
    </div>
  );
}
