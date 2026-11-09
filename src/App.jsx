import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Vistas publicas
import Login from './pages/Login';
import Registro from './pages/Registro'; 

// Vistas del Panel Administrativo
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Productos from './pages/admin/Productos';
import Categorias from './pages/admin/Categorias';
import Ordenes from './pages/admin/Ordenes';
import PerfilAdmin from './pages/admin/PerfilAdmin';

// Importar la ruta protegida
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      {/* Rutas protegidas: solo se ven si hay sesion activa */}
      <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin/usuarios" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      <Route path="/admin/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
      <Route path="/admin/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
      <Route path="/admin/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
      <Route path="/admin/perfil" element={<ProtectedRoute><PerfilAdmin /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;