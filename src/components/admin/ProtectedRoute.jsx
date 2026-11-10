import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const usuarioActual = localStorage.getItem('usuarioActual');

  // Si no hay usuario logueado, lo manda al login
  if (!usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, deja pasar al componente solicitado
  return children;
}

export default ProtectedRoute;