import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { guardar } from '../utils/storage.js'
import { regionesYcomunas } from '../data/regiones.js'
import { esCorreoValido, esPasswordValida, esRunFormatoValido } from '../utils/validaciones.js'

const inicial = { run: '', correo: '', nombre: '', apellido: '', password: '', fechaNac: '', region: '', comuna: '', direccion: '' }

export default function Registro() {
  const [f, setF] = useState(inicial)
  const [ok, setOk] = useState(false)
  const navigate = useNavigate()

  const set = (campo) => (e) => setF({ ...f, [campo]: e.target.value, ...(campo === 'region' ? { comuna: '' } : {}) })
  const comunas = regionesYcomunas.find((r) => r.region === f.region)?.comunas ?? []

  const errRun = f.run && !esRunFormatoValido(f.run) ? 'RUN inválido. Debe tener entre 7 y 9 caracteres, sin puntos ni guion.' : ''
  const errCorreo = f.correo && !esCorreoValido(f.correo) ? 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com' : ''
  const errPass = f.password && !esPasswordValida(f.password) ? 'La contraseña debe tener entre 4 y 10 caracteres.' : ''

  const valido =
    esRunFormatoValido(f.run) && esCorreoValido(f.correo) && esPasswordValida(f.password) &&
    f.nombre.trim() && f.apellido.trim() && f.region && f.comuna && f.direccion.trim()

  const registrar = (e) => {
    e.preventDefault()
    guardar('usuarioHuertoHogar', f)
    setOk(true)
    setF(inicial)
    setTimeout(() => navigate('/login'), 2000)
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Crea tu Cuenta</h2>
              <form onSubmit={registrar}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">RUN (Sin puntos ni guion): <span className="text-danger">*</span></label>
                    <input className="form-control" placeholder="Ej: 19011022K" maxLength="9" value={f.run} onChange={set('run')} />
                    <span className="text-danger small">{errRun}</span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Correo Electrónico: <span className="text-danger">*</span></label>
                    <input type="email" className="form-control" placeholder="ejemplo@duoc.cl" maxLength="100" value={f.correo} onChange={set('correo')} />
                    <span className="text-danger small">{errCorreo}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre: <span className="text-danger">*</span></label>
                    <input className="form-control" maxLength="50" value={f.nombre} onChange={set('nombre')} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Apellidos: <span className="text-danger">*</span></label>
                    <input className="form-control" maxLength="100" value={f.apellido} onChange={set('apellido')} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Contraseña: <span className="text-danger">*</span></label>
                    <input type="password" className="form-control" placeholder="Entre 4 y 10 caracteres" maxLength="10" value={f.password} onChange={set('password')} />
                    <span className="text-danger small">{errPass}</span>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Fecha de Nacimiento: (Opcional)</label>
                    <input type="date" className="form-control" value={f.fechaNac} onChange={set('fechaNac')} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Región: <span className="text-danger">*</span></label>
                    <select className="form-select" value={f.region} onChange={set('region')}>
                      <option value="">Seleccione Región...</option>
                      {regionesYcomunas.map((r) => <option key={r.region} value={r.region}>{r.region}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Comuna: <span className="text-danger">*</span></label>
                    <select className="form-select" value={f.comuna} onChange={set('comuna')} disabled={!f.region}>
                      <option value="">Seleccione Comuna...</option>
                      {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección: <span className="text-danger">*</span></label>
                  <input className="form-control" maxLength="300" value={f.direccion} onChange={set('direccion')} />
                </div>
                {ok && <div className="text-success small fw-bold">¡Registro exitoso! Ya puedes iniciar sesión.</div>}
                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-success" disabled={!valido}>Registrarse</button>
                </div>
              </form>
            </div>
            <p className="text-center mt-3 text-muted">
              ¿Ya eres parte de Huerto Hogar? <Link to="/login" className="text-success text-decoration-none fw-bold">Inicia sesión aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
