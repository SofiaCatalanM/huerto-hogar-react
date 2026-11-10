import { useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { productos, CATEGORIAS } from '../data/productos.js'
import { useCart } from '../context/CartContext.jsx'

export default function Home() {
  const [categoria, setCategoria] = useState('Todas')
  const { agregar } = useCart()

  const filtrados = categoria === 'Todas' ? productos : productos.filter((p) => p.categoria === categoria)

  return (
    <div className="container py-5">
      <section className="text-center mx-auto mb-5">
        <h1 className="display-4 fw-bold text-dark mb-3">
          Sabor y frescura <span className="text-success">de origen local</span>
        </h1>
        <p className="lead text-secondary mb-4">Productos orgánicos del campo directamente a la puerta de tu hogar.</p>
      </section>

      <div className="mb-4 text-center">
        <h5 className="fw-bold mb-3 text-secondary">Categorías</h5>
        <div className="d-flex flex-wrap justify-content-center">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm me-2 mb-2 ${cat === categoria ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="row g-4">
        {filtrados.map((p) => (
          <ProductCard key={p.id} producto={p} onAgregar={agregar} />
        ))}
      </div>
    </div>
  )
}
