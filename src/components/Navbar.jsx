import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/carrito', label: 'Tienda / Carrito' },
  { to: '/blogs', label: 'Blogs' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/login', label: 'Iniciar Sesion' },
  { to: '/registro', label: 'Registro' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const { totalItems } = useCart()
  const cerrar = () => setAbierto(false)

  return (
    <>
      
      <style>{`
        .navbar-green .nav-link { color: #ffffff !important; }
        .navbar-green .nav-link:hover { color: #f8f9fa !important; }
        .navbar-green .navbar-brand { color: #ffffff !important; }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark navbar-green shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 brand-text text-decoration-none" onClick={cerrar}>
            <img src="/img/logo.png" alt="Logo HuertoHogar" className="logo-img" />
            <span>HuertoHogar</span>
          </Link>
          <button className="navbar-toggler" type="button" onClick={() => setAbierto(!abierto)} aria-label="Menu">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`}>
            <ul className="navbar-nav me-auto">
              {links.map((l) => (
                <li className="nav-item" key={l.to}>
                  <NavLink 
                    to={l.to} 
                    end={l.end} 
                    className="nav-link" 
                    onClick={cerrar}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item">
                <NavLink 
                  to="/admin" 
                  className="nav-link" 
                  onClick={cerrar}
                >
                  Panel Admin
                </NavLink>
              </li>
            </ul>
            <Link to="/carrito" className="btn btn-yellow position-relative d-flex align-items-center gap-2" onClick={cerrar}>
              <span>Carrito</span>
              <span className="badge bg-danger rounded-pill">{totalItems}</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}