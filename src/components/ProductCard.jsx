import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card h-100 shadow-sm border-0">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body d-flex flex-column text-center">
        <h5 className="card-title fw-bold">{product.name}</h5>
        <p className="card-text text-muted mb-2">{product.category}</p>
        <p className="card-text fw-bold fs-4 text-success">
          ${product.price.toLocaleString('es-CL')}
        </p>
        <button 
          type="button"
          className="btn btn-success mt-auto w-100 fw-bold"
          onClick={() => addToCart(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;