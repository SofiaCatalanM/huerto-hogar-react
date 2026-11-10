import React from 'react';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const Catalog = ({ addToCart }) => {
  const items = products || [];

  return (
    <div>
      <h2 className="fw-bold mb-4">Catálogo de Productos</h2>
      <div className="row">
        {items.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} 
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;