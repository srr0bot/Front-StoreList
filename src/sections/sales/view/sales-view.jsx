import React, { useState, useEffect } from 'react';

import VentaDetalle from '../sales-table';

export default function SalesView() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Simular una solicitud HTTP a la API para obtener la lista de ventas
    const fetchVentas = async () => {
      try {
        const response = await fetch('http://localhost:3000/sales');
        const data = await response.json();
        setVentas(data.data);
        setLoading(false); // Marcar como cargado cuando se obtienen los datos
      } catch (error) {
        console.error('Error fetching ventas:', error);
      }
    };

    fetchVentas();
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
