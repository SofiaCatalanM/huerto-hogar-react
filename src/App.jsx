import React, { useState } from 'react';
import Catalog from './views/Catalog';
import Checkout from './views/Checkout';
import CartModal from './components/CartModal';

function App() {
  const [cart, setCart] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [currentView, setCurrentView] = useState('catalog');

  // Agregar producto al carrito con garantía de re-render reactivo
  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log('🛒 Producto agregado. Total de ítems:', updatedCart.length);
      return updatedCart;
    });
  };

  // Eliminar un producto por su posición
  const removeFromCart = (indexToRemove) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== indexToRemove));
  };

  // Navegar a Checkout
  const handleProceedToCheckout = () => {
    setShowCartModal(false);
    setCurrentView('checkout');
  };

  // Completar orden y restablecer
  const handleCompleteOrder = () => {
    setCart([]);
    setCurrentView('catalog');
  };

  return (
    <div className="w-100 min-vh-100 bg-light">
      {/* Navbar principal con badge dinámico de Bootstrap */}
      <nav className="navbar navbar-dark bg-dark mb-4 shadow-sm px-4">
        <div className="container-fluid">
          <span 
            className="navbar-brand fw-bold fs-4" 
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentView('catalog')}
          >
            🛒 Huerto Hogar
          </span>
          
          <button 
            type="button"
            className="btn btn-outline-light fw-bold d-flex align-items-center gap-2"
            onClick={() => setShowCartModal(true)}
          >
            🛒 Carrito
            <span className="badge bg-success rounded-pill fs-6">{cart.length}</span>
          </button>
        </div>
      </nav>

      {/* Renderizado de vistas */}
      <main className="container pb-5">
        {currentView === 'catalog' ? (
          <Catalog addToCart={addToCart} />
        ) : (
          <Checkout 
            cart={cart} 
            onBackToCatalog={() => setCurrentView('catalog')}
            onCompleteOrder={handleCompleteOrder}
          />
        )}
      </main>

      {/* Modal del Carrito */}
      <CartModal 
        show={showCartModal}
        onClose={() => setShowCartModal(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />
    </div>
  );
}

export default App;