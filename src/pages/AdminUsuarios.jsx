import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import { leer, guardar } from '../utils/storage.js'
import { esCorreoValido, validarRUN } from '../utils/validaciones.js'
import { regionesYcomunas } from '../data/regiones.js'

const CLAVE = 'huertohogar_usuarios'
const iniciales = [
  { rut: '12.345.678-9', nombre: 'Sofía', apellidos: 'Catalán', correo: 'sofia@duoc.cl', tipo: 'Administrador', region: 'Región Metropolitana de Santiago', comuna: 'Santiago' },
  { rut: '9.876.543-2', nombre: 'Juan', apellidos: 'Pérez', correo: 'juan@gmail.com', tipo: 'Cliente', region: 'Región de Valparaíso', comuna: 'Viña del Mar' },
  { rut: '15.123.456-7', nombre: 'María', apellidos: 'González', correo: 'maria@profesor.duoc.cl', tipo: 'Vendedor', region: 'Región del Biobío', comuna: 'Concepción' },
]
const vacio = { rut: '', nombre: '', apellidos: '', correo: '', tipo: '', region: '', comuna: '' }

export default function AdminUsuarios() {
  const [lista, setLista] = useState(() => leer(CLAVE, iniciales))
  const [form, setForm] = useState(vacio)
  const [editando, setEditando] = useState(null)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => guardar(CLAVE, lista), [lista])

  const set = (c) => (e) => setForm({ ...form, [c]: e.target.value, ...(c === 'region' ? { comuna: '' } : {}) })
  const comunas = regionesYcomunas.find((r) => r.region === form.region)?.comunas ?? []
  const rutMal = form.rut && !validarRUN(form.rut)
  const correoMal = form.correo && !esCorreoValido(form.correo)

  const nuevo = () => { setForm(vacio); setEditando(null); setAbierto(true) }
  const editar = (i) => { setForm(lista[i]); setEditando(i); setAbierto(true) }
  const eliminar = (i) => { if (confirm('¿Eliminar este usuario?')) setLista(lista.filter((_, k) => k !== i)) }

  const enviar = (e) => {
    e.preventDefault()
    if (rutMal || correoMal) return
    setLista(editando === null ? [...lista, form] : lista.map((u, k) => (k === editando ? form : u)))
    setAbierto(false)
  }

  return (
    <div className="container py-5">
      <Link to="/admin" className="text-success text-decoration-none small">← Dashboard</Link>
      <div className="d-flex justify-content-between flex-wrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestión de Usuarios</h1>
        <button className="btn btn-success" onClick={nuevo}>+ Agregar Nuevo Usuario</button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr><th>RUT</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            {lista.map((u, i) => (
              <tr key={u.rut}>
                <td>{u.rut}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td><span className="badge bg-secondary">{u.tipo}</span></td>
                <td>
                  <button className="btn btn-sm btn-warning me-1" onClick={() => editar(i)}>Editar</button>
                  <button className="btn btn-sm btn-danger" onClick={() => eliminar(i)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal abierto={abierto} titulo={editando === null ? 'Registrar Nuevo Usuario' : 'Editar Usuario'} onCerrar={() => setAbierto(false)}>
        <form onSubmit={enviar}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">RUT *</label>
              <input className={`form-control ${rutMal ? 'is-invalid' : ''}`} placeholder="12345678-9" required value={form.rut} onChange={set('rut')} />
              <div className="invalid-feedback">Ingrese un RUT válido (Módulo 11).</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Tipo de Usuario *</label>
              <select className="form-select" required value={form.tipo} onChange={set('tipo')}>
                <option value="">Seleccione una opción</option>
                <option>Administrador</option>
                <option>Vendedor</option>
                <option>Cliente</option>
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Nombre *</label>
              <input className="form-control" required maxLength="50" value={form.nombre} onChange={set('nombre')} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Apellidos *</label>
              <input className="form-control" required maxLength="100" value={form.apellidos} onChange={set('apellidos')} />
            </div>
            <div className="col-12">
              <label className="form-label">Correo Electrónico *</label>
              <input type="email" className={`form-control ${correoMal ? 'is-invalid' : ''}`} required maxLength="100" value={form.correo} onChange={set('correo')} />
              <div className="invalid-feedback">Ingrese un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).</div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Región</label>
              <select className="form-select" value={form.region} onChange={set('region')}>
                <option value="">Seleccione Región...</option>
                {regionesYcomunas.map((r) => <option key={r.region}>{r.region}</option>)}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">Comuna</label>
              <select className="form-select" value={form.comuna} onChange={set('comuna')} disabled={!form.region}>
                <option value="">Seleccione Comuna...</option>
                {comunas.map((c) => <option key={c}>{c}</option>)}
              </select>
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
