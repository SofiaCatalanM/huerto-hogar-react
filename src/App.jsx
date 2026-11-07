import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro'; 
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';

function App() {
  return (
    <Routes>
      {/* Redirigir la raiz al login */}
      <Route path="/" element={<Navigate to="/login" />} />
      
      {/* Vistas publicas */}
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      
      {/* Vistas del Panel Administrativo */}
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/usuarios" element={<Users />} />
      
      {/* Mas rutas se iran agregando aqui */}
    </Routes>
  );
}

export default App;