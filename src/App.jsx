import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import Layout from './components/Layout.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';

// Vistas publicas
import Home from './pages/Home.jsx';
import Carrito from './pages/Carrito.jsx';
import Blogs from './pages/Blogs.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';

// Vistas del Panel Administrativo
import Dashboard from './pages/admin/Dashboard.jsx';
import Users from './pages/admin/Users.jsx';
import Productos from './pages/admin/Productos.jsx';
import Categorias from './pages/admin/Categorias.jsx';
import Ordenes from './pages/admin/Ordenes.jsx';
import PerfilAdmin from './pages/admin/PerfilAdmin.jsx';

export default function App() {
  return (
    <Routes>
      {/* Rutas Publicas (Tienda) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Route>

      {/* Rutas del Panel Administrativo (Protegidas) */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="usuarios" element={<Users />} />
        <Route path="productos" element={<Productos />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="ordenes" element={<Ordenes />} />
        <Route path="perfil" element={<PerfilAdmin />} />
      </Route>

      {/* Redireccion para rutas no encontradas */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}