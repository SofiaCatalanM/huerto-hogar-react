import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import Modal from '../components/Modal.jsx'
import { formatoCLP } from '../utils/validaciones.js'

export default function Carrito() {
  const { items, cambiarCantidad, eliminar, vaciar, total } = useCart()
  const [pagando, setPagando] = useState(false)

  const pagar = (e) => {
    e.preventDefault()
    alert('¡Gracias por tu compra en HuertoHogar! Tu pedido ha sido procesado exitosamente.')
    vaciar()
    setPagando(false)
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Tu Carrito de Compras</h2>
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th><th></th></tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-4 text-secondary">El carrito está vacío.</td></tr>
                ) : (
                  items.map((i) => (
                    <tr key={i.id}>
                      <td className="fw-bold">{i.nombre} <span className="badge bg-secondary ms-1">{i.id}</span></td>
                      <td>{formatoCLP(i.precio)}</td>
                      <td>
                        <input
                          type="number" min="1" value={i.cantidad}
                          className="form-control form-control-sm w-auto d-inline"
                          style={{ width: 80 }}
                          onChange={(e) => { const v = parseInt(e.target.value, 10); if (v > 0) cambiarCantidad(i.id, v) }}
                        />
                      </td>
                      <td className="fw-bold text-emerald">{formatoCLP(i.precio * i.cantidad)}</td>
                      <td><button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(i.id)}>Eliminar</button></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {items.length > 0 && <button className="btn btn-outline-secondary btn-sm" onClick={vaciar}>Vaciar carrito</button>}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-4">
            <h4 className="fw-bold mb-3">Resumen de Compra</h4>
            <div className="d-flex justify-content-between mb-2"><span>Subtotal:</span><span>{formatoCLP(total)}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5 mb-4"><span>Total:</span><span>{formatoCLP(total)}</span></div>
            <button className="btn btn-success w-100 py-2 fw-bold" disabled={items.length === 0} onClick={() => setPagando(true)}>
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>

      <Modal abierto={pagando} titulo="Pago" onCerrar={() => setPagando(false)} grande={false}>
        <form onSubmit={pagar}>
          <p className="fw-bold">Total a pagar: {formatoCLP(total)}</p>
          <div className="mb-3">
            <label className="form-label">Nombre en la tarjeta</label>
            <input className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Número de tarjeta</label>
            <input className="form-control" required maxLength="16" inputMode="numeric" />
          </div>
          <button type="submit" className="btn btn-success w-100">Pagar</button>
        </form>
      </Modal>
    </div>
  )
}
