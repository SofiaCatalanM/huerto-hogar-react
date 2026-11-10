import React from 'react';

function OrderDetails({ orden, onClose }) {
  if (!orden) return null;

  return (
    <div>
      <div className="row mb-3">
        <div className="col-md-6">
          <p><strong>Cliente:</strong> {orden.usuarioNombre}</p>
          <p><strong>Fecha:</strong> {orden.fecha}</p>
        </div>
        <div className="col-md-6 text-md-end">
          <p><strong>Total:</strong> ${orden.total.toLocaleString()}</p>
          <p><strong>Estado:</strong> {orden.estado}</p>
        </div>
      </div>

      <h6 className="border-bottom pb-2 mb-3">Productos de la orden</h6>
      
      <div className="table-responsive">
        <table className="table table-sm table-bordered">
          <thead className="table-light">
            <tr>
              <th>Producto</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.productos.map((prod, index) => (
              <tr key={index}>
                <td>{prod.nombre}</td>
                <td className="text-center">{prod.cantidad}</td>
                <td className="text-end">${prod.subtotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default OrderDetails;