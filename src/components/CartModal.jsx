import React from 'react';

const CartModal = ({ show, onClose, cart, removeFromCart, onProceedToCheckout }) => {
  if (!show) return null;

  // Calcular el total acumulado de los productos en el carrito
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fw-bold">🛒 Tu Carrito de Compras</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            {cart.length === 0 ? (
              <p className="text-center text-muted my-4">El carrito está vacío.</p>
            ) : (
              <div className="table-responsive">
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th className="text-end">Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }} 
                            className="me-2 rounded" 
                          />
                          {item.name}
                        </td>
                        <td><span className="badge bg-secondary">{item.category}</span></td>
                        <td className="fw-bold">${item.price.toLocaleString('es-CL')}</td>
                        <td className="text-end">
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(index)}
                          >
                            Quitar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <h4 className="fw-bold m-0">Total: ${total.toLocaleString('es-CL')}</h4>
            <div>
              <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
                Seguir comprando
              </button>
              <button 
                type="button" 
                className="btn btn-success fw-bold"
                disabled={cart.length === 0}
                onClick={onProceedToCheckout}
              >
                Ir a Pagar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;