import React, { useState, useEffect } from 'react';

import VentaDetalle from '../sales-table';

export default function SalesView() {

  const API_URL = import.meta.env.VITE_API_URL;

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Simular una solicitud HTTP a la API para obtener la lista de ventas
    const fetchVentas = async () => {
      try {
        const response = await fetch(`${API_URL}/sales`);
        const data = await response.json();
        setVentas(data.data);
        setLoading(false); // Marcar como cargado cuando se obtienen los datos
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };

    fetchVentas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Lista de Ventas</h1>
      {loading ? ( // Mostrar "Cargando..." si está cargando
        <div>Cargando...</div>
      ) : (
        <div>
          {ventas.map((venta) => (
            <VentaDetalle key={venta._id} venta={venta} />
          ))}
        </div>
      )}
    </div>
  );
}
