import React from 'react';

const ProductCard = ({ product, addToCart }) => {
  // Garantizar precio numérico limpio para formato CLP ($ X.XXX)
  const numericPrice = typeof product.price === 'number' 
    ? product.price 
    : parseInt(String(product.price).replace(/\D/g, ''), 10) || 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0">
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.name}
          style={{ height: '180px', objectFit: 'cover' }}
        />
        <div className="card-body d-flex flex-column">
          <span className="badge bg-success w-auto align-self-start mb-2">
            {product.category}
          </span>
          <h5 className="card-title fw-bold">{product.name}</h5>
          <p className="card-text text-muted small flex-grow-1">
            {product.description}
          </p>
          <div className="d-flex justify-content-between align-items-center mt-3">
            <span className="fs-5 fw-bold text-dark">
              ${numericPrice.toLocaleString('es-CL')}
            </span>
            <button 
              className="btn btn-outline-success btn-sm fw-bold"
              onClick={() => addToCart(product)}
            >
              + Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;