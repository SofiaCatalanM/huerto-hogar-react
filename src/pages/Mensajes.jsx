import { useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal.jsx'

const iniciales = [
  { id: 1, fecha: '25/09/2026', remitente: 'juan.perez@gmail.com', asunto: 'Consulta sobre despacho a Puerto Montt', mensaje: 'Hola, quisiera saber si realizan despachos a Puerto Montt y cuál es el tiempo de entrega.', estado: 'No leído' },
  { id: 2, fecha: '24/09/2026', remitente: 'maria.gonzalez@duoc.cl', asunto: 'Problema con mi último pedido #4590', mensaje: 'Buenos días, recibí mi pedido pero faltaban 2 productos. ¿Cómo puedo reclamar?', estado: 'Leído' },
  { id: 3, fecha: '23/09/2026', remitente: 'contacto@empresa.cl', asunto: 'Propuesta de alianza comercial', mensaje: 'Somos una empresa de logística y nos gustaría proponer una alianza comercial.', estado: 'Leído' },
]

export default function Mensajes() {
  const [mensajes, setMensajes] = useState(iniciales)
  const [verId, setVerId] = useState(null)
  const actual = mensajes.find((m) => m.id === verId)
  const noLeidos = mensajes.filter((m) => m.estado === 'No leído').length

  const ver = (id) => {
    setMensajes(mensajes.map((m) => (m.id === id ? { ...m, estado: 'Leído' } : m)))
    setVerId(id)
  }
  const eliminar = (id) => { if (confirm('¿Estás seguro de eliminar este mensaje?')) setMensajes(mensajes.filter((m) => m.id !== id)) }

  return (
    <div className="container py-5">
      <Link to="/admin" className="text-success text-decoration-none small">← Dashboard</Link>
      <div className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Bandeja de Entrada</h1>
        <span className="badge bg-primary rounded-pill">{noLeidos} nuevos</span>
      </div>

      <div className="card shadow-sm"><div className="card-body table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead className="table-light">
            <tr><th>Fecha</th><th>Remitente</th><th>Asunto</th><th>Estado</th><th className="text-end">Acciones</th></tr>
          </thead>
          <tbody>
            {mensajes.map((m) => (
              <tr key={m.id} className={m.estado === 'No leído' ? 'table-active fw-bold' : ''}>
                <td>{m.fecha}</td>
                <td>{m.remitente}</td>
                <td>{m.asunto}</td>
                <td><span className={`badge ${m.estado === 'No leído' ? 'bg-warning text-dark' : 'bg-success'}`}>{m.estado}</span></td>
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-primary me-1" onClick={() => ver(m.id)}>Ver</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(m.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div></div>

      <Modal abierto={!!actual} titulo="Detalle del Mensaje" onCerrar={() => setVerId(null)}
        pie={<button className="btn btn-secondary" onClick={() => setVerId(null)}>Cerrar</button>}>
        {actual && (
          <>
            <p><strong>De:</strong> {actual.remitente}</p>
            <p><strong>Fecha:</strong> {actual.fecha}</p>
            <p><strong>Asunto:</strong> {actual.asunto}</p>
            <hr />
            <strong>Mensaje:</strong>
            <p className="mt-2">{actual.mensaje}</p>
          </>
        )}
      </Modal>
    </div>
  )
}
