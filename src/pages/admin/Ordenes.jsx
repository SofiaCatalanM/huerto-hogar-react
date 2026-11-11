import React, { useState, useEffect } from 'react';
import OrderDetails from '../../components/admin/OrderDetails';
import { obtenerOrdenes } from '../../data/db';

function Orders() {
  const [ordenes, setOrdenes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [ordenSeleccionada, setOrdenSeleccionada] = useState(null);

  useEffect(() => {
    setOrdenes(obtenerOrdenes());
  }, []);

  const handleVerDetalle = (orden) => {
    setOrdenSeleccionada(orden);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setOrdenSeleccionada(null);
  };

  // Función para determinar el color del badge según el estado
  const getBadgeClass = (estado) => {
    switch (estado.toLowerCase()) {
      case 'pendiente': return 'bg-warning text-dark';
      case 'entregado': return 'bg-success';
      case 'cancelado': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Historial de Ordenes y Boletas</h1>
      </div>

      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID Orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Total</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.length > 0 ? (
              ordenes.map((orden) => (
                <tr key={orden.id}>
                  <td>#{orden.id}</td>
                  <td>{orden.fecha}</td>
                  <td>{orden.usuarioNombre}</td>
                  <td>${orden.total.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(orden.estado)}`}>
                      {orden.estado}
                    </span>
                  </td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-primary" 
                      onClick={() => handleVerDetalle(orden)}
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No hay ordenes registradas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalle de Orden #{ordenSeleccionada?.id}</h5>
                <button type="button" className="btn-close" onClick={handleCerrarModal}></button>
              </div>
              <div className="modal-body">
                <OrderDetails 
                  orden={ordenSeleccionada} 
                  onClose={handleCerrarModal} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Orders;