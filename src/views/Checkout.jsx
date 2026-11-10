import React, { useState } from 'react';

const Checkout = ({ cart, onBackToCatalog, onCompleteOrder }) => {
  // Estado local para los campos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    comuna: '',
    metodoPago: 'tarjeta'
  });

  const [orderSuccess, setOrderSuccess] = useState(false);

  // Calcular el total
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simular procesamiento de orden exitoso
    setOrderSuccess(true);
    setTimeout(() => {
      onCompleteOrder();
    }, 3000);
  };

  if (orderSuccess) {
    return (
      <div className="text-center py-5">
        <div className="alert alert-success d-inline-block p-4 shadow-sm" style={{ maxWidth: '500px' }}>
          <h3 className="fw-bold mb-3">🎉 ¡Compra Realizada con Éxito!</h3>
          <p className="mb-2">Gracias por tu compra, <strong>{formData.nombre}</strong>.</p>
          <p className="text-muted small mb-0">Hemos enviado el comprobante a {formData.email}. Volviendo al catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-5">
      {/* Columna Izquierda: Formulario de Despacho y Pago */}
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3 fw-bold">Datos de Envío y Pago</h4>
        <form onSubmit={handleSubmit} className="needs-validation">
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
                required 
                placeholder="Juan Pérez"
              />
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label fw-semibold">Correo Electrónico</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                placeholder="juan@ejemplo.com"
              />
            </div>

            <div className="col-sm-8">
              <label htmlFor="direccion" className="form-label fw-semibold">Dirección de Despacho</label>
              <input 
                type="text" 
                className="form-control" 
                id="direccion" 
                name="direccion" 
                value={formData.direccion} 
                onChange={handleChange} 
                required 
                placeholder="Av. Principal 123"
              />
            </div>

            <div className="col-sm-4">
              <label htmlFor="comuna" className="form-label fw-semibold">Comuna</label>
              <input 
                type="text" 
                className="form-control" 
                id="comuna" 
                name="comuna" 
                value={formData.comuna} 
                onChange={handleChange} 
                required 
                placeholder="Santiago"
              />
            </div>
          </div>

          <hr className="my-4" />

          <h4 className="mb-3 fw-bold">Método de Pago</h4>
          <div className="my-3">
            <div className="form-check">
              <input 
                id="tarjeta" 
                name="metodoPago" 
                type="radio" 
                className="form-check-input" 
                value="tarjeta"
                checked={formData.metodoPago === 'tarjeta'} 
                onChange={handleChange} 
              />
              <label className="form-check-label" htmlFor="tarjeta">Tarjeta de Débito / Crédito (Webpay)</label>
            </div>
            <div className="form-check">
              <input 
                id="transferencia" 
                name="metodoPago" 
                type="radio" 
                className="form-check-input" 
                value="transferencia"
                checked={formData.metodoPago === 'transferencia'} 
                onChange={handleChange} 
              />
              <label className="form-check-label" htmlFor="transferencia">Transferencia Bancaria Directa</label>
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex justify-content-between">
            <button 
              type="button" 
              className="btn btn-outline-secondary"
              onClick={onBackToCatalog}
            >
              ← Volver al Catálogo
            </button>
            <button className="btn btn-success btn-lg fw-bold px-4" type="submit">
              Confirmar y Pagar
            </button>
          </div>
        </form>
      </div>

      {/* Columna Derecha: Resumen del Pedido */}
      <div className="col-md-5 col-lg-4">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-bold">
            Resumen del Pedido ({cart.length})
          </div>
          <ul className="list-group list-group-flush">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">{item.category}</small>
                </div>
                <span className="text-muted">${item.price.toLocaleString('es-CL')}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between bg-light fw-bold fs-5">
              <span>Total (CLP)</span>
              <strong className="text-success">${total.toLocaleString('es-CL')}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;