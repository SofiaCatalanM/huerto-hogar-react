import React from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Catalog = ({ addToCart }) => {
  return (
    <div>
      <h2 className="mb-4 fw-bold">Catálogo de Productos</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <ProductCard product={product} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;