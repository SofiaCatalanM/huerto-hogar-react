import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Vistas públicas y de tienda
import Catalog from './views/Catalog';
import Checkout from './views/Checkout';
import CartModal from './components/CartModal';

// Vistas de Autenticación
import Login from './pages/Login';
import Registro from './pages/Registro'; 

// Vistas del Panel Administrativo
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Productos from './pages/admin/Productos';
import Categorias from './pages/admin/Categorias';
import Ordenes from './pages/admin/Ordenes';
import PerfilAdmin from './pages/admin/PerfilAdmin';

// Ruta protegida de admin
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const navigate = useNavigate();

  // Agregar producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  // Vaciar carrito al completar orden
  const handleCompleteOrder = () => {
    setCart([]);
    navigate('/');
  };

  return (
    <div className="w-100 min-vh-100 bg-light">
      <Routes>
        {/* Ruta principal de la Tienda (Catálogo + Navbar con Carrito) */}
        <Route 
          path="/" 
          element={
            <>
              <nav className="navbar navbar-dark bg-dark mb-4 shadow-sm px-4">
                <div className="container-fluid">
                  <span 
                    className="navbar-brand fw-bold fs-4" 
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                  >
                    🛒 Huerto Hogar
                  </span>
                  
                  <div className="d-flex gap-2">
                    <button 
                      type="button"
                      className="btn btn-outline-light fw-bold d-flex align-items-center gap-2"
                      onClick={() => setShowCartModal(true)}
                    >
                      🛒 Carrito
                      <span className="badge bg-success rounded-pill fs-6">{cart.length}</span>
                    </button>
                    <button 
                      type="button"
                      className="btn btn-primary fw-bold"
                      onClick={() => navigate('/login')}
                    >
                      Admin / Login
                    </button>
                  </div>
                </div>
              </nav>

              <main className="container pb-5">
                <Catalog addToCart={addToCart} />
              </main>

              <CartModal 
                show={showCartModal}
                onClose={() => setShowCartModal(false)}
                cart={cart}
                removeFromCart={removeFromCart}
                onProceedToCheckout={() => {
                  setShowCartModal(false);
                  navigate('/checkout');
                }}
              />
            </>
          } 
        />

        {/* Ruta de Checkout */}
        <Route 
          path="/checkout" 
          element={
            <div className="container py-5">
              <Checkout 
                cart={cart} 
                onBackToCatalog={() => navigate('/')}
                onCompleteOrder={handleCompleteOrder}
              />
            </div>
          } 
        />

        {/* Vistas de Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        
        <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/admin/usuarios" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/admin/productos" element={<ProtectedRoute><Productos /></ProtectedRoute>} />
        <Route path="/admin/categorias" element={<ProtectedRoute><Categorias /></ProtectedRoute>} />
        <Route path="/admin/ordenes" element={<ProtectedRoute><Ordenes /></ProtectedRoute>} />
        <Route path="/admin/perfil" element={<ProtectedRoute><PerfilAdmin /></ProtectedRoute>} />

        {/* Cualquier otra ruta desconocida redirige al home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;