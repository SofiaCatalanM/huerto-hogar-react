import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import { leer, guardar } from '../utils/storage.js'
import { formatoCLP } from '../utils/validaciones.js'

const CLAVE = 'huertohogar_productos'
const iniciales = [
  { codigo: 'FR001', nombre: 'Manzanas Fuji', categoria: 'Frutas', descripcion: '', precio: 1200, stock: 150, stockCritico: 20 },
  { codigo: 'VR001', nombre: 'Zanahorias Orgánicas', categoria: 'Verduras', descripcion: '', precio: 900, stock: 15, stockCritico: 20 },
  { codigo: 'PO001', nombre: 'Miel Orgánica Muestra', categoria: 'Orgánicos', descripcion: '', precio: 0, stock: 50, stockCritico: 10 },
]
const vacio = { codigo: '', nombre: '', categoria: '', descripcion: '', precio: 0, stock: 0, stockCritico: 0 }

export default function AdminProductos() {
  const [lista, setLista] = useState(() => leer(CLAVE, iniciales))
  const [form, setForm] = useState(vacio)
  const [editando, setEditando] = useState(null) // índice o null
  const [abierto, setAbierto] = useState(false)

  useEffect(() => guardar(CLAVE, lista), [lista])

  const hayCritico = lista.some((p) => p.stock <= p.stockCritico)
  const set = (c) => (e) => setForm({ ...form, [c]: e.target.value })

  const nuevo = () => { setForm(vacio); setEditando(null); setAbierto(true) }
  const editar = (i) => { setForm(lista[i]); setEditando(i); setAbierto(true) }
  const eliminar = (i) => { if (confirm('¿Eliminar este producto?')) setLista(lista.filter((_, k) => k !== i)) }

  const enviar = (e) => {
    e.preventDefault()
    const p = { ...form, precio: Number(form.precio), stock: Number(form.stock), stockCritico: Number(form.stockCritico) }
    setLista(editando === null ? [...lista, p] : lista.map((x, k) => (k === editando ? p : x)))
    setAbierto(false)
  }

  return (
    <div className="container py-5">
      <Link to="/admin" className="text-success text-decoration-none small">← Dashboard</Link>
      <div className="d-flex justify-content-between flex-wrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestión de Productos</h1>
        <button className="btn btn-success" onClick={nuevo}>+ Agregar Nuevo Producto</button>
      </div>

      {hayCritico && (
        <div className="alert alert-warning d-flex align-items-center">
          <span className="fs-4 me-2">⚠️</span>
          <div><strong>Atención:</strong> Hay productos con stock igual o inferior al stock crítico.</div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr><th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {lista.map((p, i) => (
              <tr key={p.codigo} className={p.stock <= p.stockCritico ? 'table-danger' : ''}>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{p.precio === 0 ? <span className="badge bg-success">FREE</span> : formatoCLP(p.precio)}</td>
                <td>{p.stock}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-1" onClick={() => editar(i)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(i)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal abierto={abierto} titulo={editando === null ? 'Registrar Nuevo Producto' : 'Editar Producto'} onCerrar={() => setAbierto(false)}>
        <form onSubmit={enviar}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Código *</label>
              <input className="form-control" required value={form.codigo} onChange={set('codigo')} disabled={editando !== null} />
            </div>
            <div className="col-md-8">
              <label className="form-label">Categoría *</label>
              <select className="form-select" required value={form.categoria} onChange={set('categoria')}>
                <option value="">Seleccione una opción</option>
                <option value="Frutas">Frutas</option>
                <option value="Verduras">Verduras</option>
                <option value="Lacteos">Lácteos</option>
                <option value="Orgánicos">Orgánicos</option>
              </select>
            </div>
            <div className="col-12">
              <label className="form-label">Nombre del Producto *</label>
              <input className="form-control" required maxLength="100" value={form.nombre} onChange={set('nombre')} />
            </div>
            <div className="col-12">
              <label className="form-label">Descripción</label>
              <textarea className="form-control" rows="3" maxLength="500" value={form.descripcion} onChange={set('descripcion')} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Precio *</label>
              <input type="number" min="0" className="form-control" required value={form.precio} onChange={set('precio')} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Stock *</label>
              <input type="number" min="0" className="form-control" required value={form.stock} onChange={set('stock')} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Stock crítico</label>
              <input type="number" min="0" className="form-control" value={form.stockCritico} onChange={set('stockCritico')} />
            </div>
          </div>
          <div className="text-end mt-4">
            <button type="button" className="btn btn-secondary me-2" onClick={() => setAbierto(false)}>Cancelar</button>
            <button type="submit" className="btn btn-success">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
