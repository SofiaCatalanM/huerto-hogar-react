import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { leer } from '../utils/storage.js'
import { esCorreoValido, esPasswordValida } from '../utils/validaciones.js'

export default function Login() {
  const [correo, setCorreo] = useState('')
  const [pass, setPass] = useState('')
  const [mensaje, setMensaje] = useState(null)
  const navigate = useNavigate()

  const errorCorreo = correo && !esCorreoValido(correo) ? 'Solo correos @duoc.cl, @profesor.duoc.cl o @gmail.com' : ''
  const errorPass = pass && !esPasswordValida(pass) ? 'La contraseña debe tener entre 4 y 10 caracteres.' : ''
  const valido = esCorreoValido(correo) && esPasswordValida(pass)

  const ingresar = (e) => {
    e.preventDefault()
    const u = leer('usuarioHuertoHogar', null)
    if (u && u.correo === correo && u.password === pass) {
      setMensaje({ ok: true, texto: '¡Inicio de sesión correcto! Bienvenido.' })
      setTimeout(() => navigate('/'), 1000)
    } else {
      setMensaje({ ok: false, texto: 'Credenciales incorrectas o usuario no registrado.' })
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">Bienvenido a Huerto Hogar</h2>
              <form onSubmit={ingresar}>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico:</label>
                  <input type="email" className="form-control" placeholder="ejemplo@duoc.cl" autoComplete="username" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                  <span className="text-danger small">{errorCorreo}</span>
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña:</label>
                  <input type="password" className="form-control" placeholder="Entre 4 y 10 caracteres" autoComplete="current-password" value={pass} onChange={(e) => setPass(e.target.value)} />
                  <span className="text-danger small">{errorPass}</span>
                </div>
                {mensaje && <div className={`small fw-bold ${mensaje.ok ? 'text-success' : 'text-danger'}`}>{mensaje.texto}</div>}
                <div className="d-grid gap-2 mt-4">
                  <button type="submit" className="btn btn-success" disabled={!valido}>Ingresar</button>
                </div>
              </form>
            </div>
            <p className="text-center mt-3 text-muted">
              ¿Aún no tienes cuenta? <Link to="/registro" className="text-success text-decoration-none fw-bold">Regístrate aquí</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
