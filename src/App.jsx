import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Registro from './pages/Registro'; 
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Productos from './pages/admin/Productos';
import Categorias from './pages/admin/Categorias';
import Ordenes from './pages/admin/Ordenes'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/admin" element={<Dashboard />} />
      <Route path="/admin/usuarios" element={<Users />} />
      <Route path="/admin/productos" element={<Productos />} />
      <Route path="/admin/categorias" element={<Categorias />} />
      <Route path="/admin/ordenes" element={<Ordenes />} /> 
    </Routes>
  );
}

export default App;