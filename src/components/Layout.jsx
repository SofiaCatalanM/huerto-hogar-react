import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'

export default function Layout() {
  const { toast, cerrarToast } = useCart()
  const { pathname } = useLocation()

  useEffect(() => window.scrollTo(0, 0), [pathname])

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />

      {toast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
          <div className="toast show align-items-center text-bg-dark border-0 shadow-lg">
            <div className="d-flex">
              <div className="toast-body d-flex align-items-center justify-content-between w-100 gap-3">
                <div>
                  <span className="fw-bold text-warning d-block">¡Añadido al carrito! 🛒</span>
                  <span className="small text-light">{toast}</span>
                </div>
                <Link to="/carrito" className="btn btn-yellow btn-sm fw-bold text-nowrap" onClick={cerrarToast}>Ver Carrito →</Link>
              </div>
              <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={cerrarToast} aria-label="Cerrar"></button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
