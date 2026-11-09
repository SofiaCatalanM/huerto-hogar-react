import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path) => {
    return location.pathname === path ? 'active text-white fw-bold' : 'text-white-50';
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 sidebar-admin" style={{ width: '280px', minHeight: '100vh' }}>
      <a href="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold">HuertoHogar Admin</span>
      </a>
      <hr className="text-white" />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/admin" className={`nav-link ${isActive('/admin')}`}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/usuarios" className={`nav-link ${isActive('/admin/usuarios')}`}>
            Gestión de Usuarios
          </Link>
        </li>
        <li>
          <Link to="/admin/productos" className={`nav-link ${isActive('/admin/productos')}`}>
            Gestión de Productos
          </Link>
        </li>
        <li>
          <Link to="/admin/categorias" className={`nav-link ${isActive('/admin/categorias')}`}>
            Categorías
          </Link>
        </li>
        <li>
          <Link to="/admin/ordenes" className={`nav-link ${isActive('/admin/ordenes')}`}>
            Órdenes / Boletas
          </Link>
        </li>
        <li>
          <Link to="/admin/perfil" className={`nav-link ${isActive('/admin/perfil')}`}>
            Mi Perfil
          </Link>
        </li>
      </ul>
      <hr className="text-white" />
      <div className="dropdown">
        <a href="/" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
          <img src="https://via.placeholder.com/32" alt="Admin" width="32" height="32" className="rounded-circle me-2" />
          <strong>Administrador</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
          <li><Link className="dropdown-item" to="/admin/perfil">Configuración</Link></li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button 
              className="dropdown-item text-danger w-100 text-start border-0 bg-transparent" 
              onClick={() => {
                localStorage.removeItem('usuarioActual');
                window.location.href = '/login';
              }}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;