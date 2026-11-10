import React, { useState } from 'react';

const Checkout = ({ cart, onBackToCatalog, onCompleteOrder }) => {
  // Estado local para los campos del formulario
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

  // Calcular el total considerando la cantidad
  const total = cart.reduce((acc, item) => acc + (item.price * (item.cantidad || 1)), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validación estricta para el Nombre: Solo letras y espacios (sin números)
    if (name === 'nombre') {
      const soloLetras = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: soloLetras }));
      return;
    }

    // Validación estricta para el Número de Tarjeta y CVV: Solo números (sin letras/strings)
    if (name === 'numeroTarjeta' || name === 'cvv') {
      const soloNumeros = value.replace(/\D/g, ''); 
      setFormData((prev) => ({ ...prev, [name]: soloNumeros }));
      return;
    }

    // Para los demás campos
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // ¡Evita que la página se recargue!
    setErrorMsg('');

    // Validar Nombre vacío o muy corto
    if (!formData.nombre.trim() || formData.nombre.trim().length < 3) {
      setErrorMsg('Por favor, ingresa un nombre completo válido (solo letras).');
      return;
    }

    // Validar Email básico
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setErrorMsg('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    // Validar Dirección y Comuna
    if (!formData.direccion.trim() || !formData.comuna.trim()) {
      setErrorMsg('Por favor, completa la dirección y la comuna de despacho.');
      return;
    }

    // Validaciones específicas si paga con tarjeta
    if (formData.metodoPago === 'tarjeta') {
      if (formData.numeroTarjeta.length < 16) {
        setErrorMsg('El número de tarjeta debe tener exactamente 16 dígitos numéricos.');
        return;
      }
      if (!formData.expiracion.trim()) {
        setErrorMsg('Por favor, ingresa la fecha de expiración de la tarjeta.');
        return;
      }
      if (formData.cvv.length < 3) {
        setErrorMsg('El CVV debe tener al menos 3 dígitos numéricos.');
        return;
      }
    }

    // Si pasa todas las validaciones, procesar éxito
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

        {/* Alerta de error visual en color rojo si falla alguna validación */}
        {errorMsg && (
          <div className="alert alert-danger py-2 fw-semibold shadow-sm" role="alert">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Usamos noValidate para anular las validaciones nativas del navegador y delegarlas 100% en handleSubmit */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="nombre" className="form-label fw-semibold">Nombre Completo (Solo letras)</label>
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

          {/* Campos de Tarjeta si está seleccionada */}
          {formData.metodoPago === 'tarjeta' && (
            <div className="row g-3 p-3 bg-light rounded border mb-4">
              <div className="col-12">
                <label htmlFor="numeroTarjeta" className="form-label fw-semibold">Número de Tarjeta (Solo números, 16 dígitos)</label>
                <input 
                  type="text" 
                  maxLength="19"
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