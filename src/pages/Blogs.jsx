import { useState } from 'react'
import Modal from '../components/Modal.jsx'
import { blogs } from '../data/blogs.js'

export default function Blogs() {
  const [abierto, setAbierto] = useState(null)

  return (
    <div className="container py-5">
      <section className="text-center mx-auto mb-5">
        <h1 className="display-5 fw-bold text-dark mb-3">Blog de Noticias y Consejos</h1>
        <p className="lead text-secondary">Descubre nuestras últimas publicaciones sobre agricultura sostenible, recetas y vida saludable.</p>
      </section>

      <div className="row g-4">
        {blogs.map((b) => (
          <div className="col-md-6 col-lg-4" key={b.id}>
            <div className="card h-100 shadow-sm border-0">
              <img src={b.imagen} className="card-img-top" alt={b.titulo} onError={(e) => (e.currentTarget.src = '/img/logo.png')} />
              <div className="card-body d-flex flex-column">
                <span className="badge bg-success mb-2 align-self-start">{b.categoria}</span>
                <h5 className="card-title fw-bold">{b.titulo}</h5>
                <p className="card-text text-secondary flex-grow-1">{b.resumen}</p>
                <div className="pt-3 border-top d-flex align-items-center justify-content-between">
                  <span className="small text-muted">{b.fecha}</span>
                  <button className="btn btn-sm btn-outline-success" onClick={() => setAbierto(b)}>Leer más »</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal abierto={!!abierto} titulo={abierto?.titulo} onCerrar={() => setAbierto(null)}
        pie={<button className="btn btn-secondary" onClick={() => setAbierto(null)}>Cerrar</button>}>
        {abierto && (
          <>
            <img src={abierto.imagen} className="img-fluid rounded mb-4 w-100" alt={abierto.titulo} onError={(e) => (e.currentTarget.src = '/img/logo.png')} />
            <div className="d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-success">{abierto.categoria}</span>
              <small className="text-muted">{abierto.fecha} · Equipo HuertoHogar</small>
            </div>
            <div dangerouslySetInnerHTML={{ __html: abierto.contenido }} />
          </>
        )}
      </Modal>
    </div>
  )
}
