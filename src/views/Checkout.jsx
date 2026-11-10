import React, { useState } from 'react';

const Checkout = ({ cart, onBackToCatalog, onCompleteOrder }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    direccion: '',
    comuna: '',
    metodoPago: 'tarjeta',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const total = cart.reduce((acc, item) => acc + (item.price * (item.cantidad || 1)), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 1. Bloqueo estricto en tiempo de escritura para el Nombre:
    // Elimina cualquier dígito numérico si intentan escribirlo
    if (name === 'nombre') {
      const soloLetras = value.replace(/[0-9]/g, '');
      setFormData((prev) => ({ ...prev, [name]: soloLetras }));
      return;
    }

    // 2. Bloqueo estricto en tiempo de escritura para Tarjeta y CVV:
    // Elimina cualquier letra o carácter especial si intentan escribirlo
    if (name === 'numeroTarjeta' || name === 'cvv') {
      const soloNumeros = value.replace(/\D/g, ''); 
      setFormData((prev) => ({ ...prev, [name]: soloNumeros }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg('');

    // Validar Nombre: No debe tener números ni estar vacío
    if (!formData.nombre.trim() || /\d/.test(formData.nombre)) {
      setErrorMsg('El nombre no puede incluir números ni estar vacío.');
      return;
    }

    // Validar Dirección y Comuna
    if (!formData.direccion.trim() || !formData.comuna.trim()) {
      setErrorMsg('Por favor completa la dirección y comuna de envío.');
      return;
    }

    // Validar Tarjeta si el método es tarjeta
    if (formData.metodoPago === 'tarjeta') {
      // Verificar que solo contenga números y tenga exactamente 16 dígitos
      if (!/^\d{16}$/.test(formData.numeroTarjeta)) {
        setErrorMsg('El número de tarjeta debe tener exactamente 16 dígitos (sin letras).');
        return;
      }

      if (!formData.expiracion.trim()) {
        setErrorMsg('Por favor ingresa la fecha de expiración.');
        return;
      }

      // Verificar que el CVV tenga 3 o 4 dígitos estrictamente numéricos
      if (!/^\d{3,4}$/.test(formData.cvv)) {
        setErrorMsg('El código CVV debe tener 3 o 4 dígitos numéricos.');
        return;
      }
    }

    // Si pasa todas las validaciones
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
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3 fw-bold">Datos de Envío y Pago</h4>

        {errorMsg && (
          <div className="alert alert-danger py-2 fw-semibold shadow-sm" role="alert">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo (Sin números)</label>
              <input 
                type="text" 
                className="form-control" 
                id="nombre" 
                name="nombre" 
                value={formData.nombre} 
                onChange={handleChange} 
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
                placeholder="Santiago"
              />
            </div>
          </div>

          <hr className="my-4" />

          <h4 className="mb-3 fw-bold">Método de Pago</h4>
          <div className="my-3">
            <div className="form-check mb-2">
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

          {formData.metodoPago === 'tarjeta' && (
            <div className="row g-3 p-3 bg-light rounded border mb-4">
              <div className="col-12">
                <label htmlFor="numeroTarjeta" className="form-label fw-semibold">Número de Tarjeta (Solo números, 16 dígitos)</label>
                <input 
                  type="text" 
                  maxLength="16"
                  className="form-control" 
                  id="numeroTarjeta" 
                  name="numeroTarjeta" 
                  value={formData.numeroTarjeta} 
                  onChange={handleChange} 
                  placeholder="4500123456789012"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="expiracion" className="form-label fw-semibold">Expiración</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="expiracion" 
                  name="expiracion" 
                  value={formData.expiracion} 
                  onChange={handleChange} 
                  placeholder="MM/AA"
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="cvv" className="form-label fw-semibold">CVV (Solo números)</label>
                <input 
                  type="text" 
                  maxLength="4"
                  className="form-control" 
                  id="cvv" 
                  name="cvv" 
                  value={formData.cvv} 
                  onChange={handleChange} 
                  placeholder="123"
                />
              </div>
            </div>
          )}

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

      <div className="col-md-5 col-lg-4">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white fw-bold">
            Resumen del Pedido ({cart.length})
          </div>
          <ul className="list-group list-group-flush">
            {cart.map((item, index) => (
              <li key={index} className="list-group-item d-flex justify-content-between lh-sm">
                <div>
                  <h6 className="my-0">{item.name || item.nombre}</h6>
                  <small className="text-muted">{item.category || item.categoria} {item.cantidad ? `(x${item.cantidad})` : ''}</small>
                </div>
                <span className="text-muted">${((item.price) * (item.cantidad || 1)).toLocaleString('es-CL')}</span>
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