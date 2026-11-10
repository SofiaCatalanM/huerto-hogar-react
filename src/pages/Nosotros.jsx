import { useState } from 'react'
import { tiendas, MAPA_URL } from '../data/tiendas.js'

export default function Nosotros() {
  const [abierta, setAbierta] = useState(0)

  return (
    <div className="container py-5">
      <section className="text-center mx-auto mb-5">
        <h1 className="display-5 fw-bold text-dark mb-3">Sobre HuertoHogar</h1>
        <p className="lead text-secondary mb-4">
          HuertoHogar es una tienda online dedicada a llevar la frescura y calidad de los productos del campo directamente a la puerta de nuestros clientes en Chile.
        </p>
        <p className="text-secondary">
          Con más de 6 años de experiencia, operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso y Concepción. Nuestra misión es conectar a las familias chilenas con el campo, promoviendo un estilo de vida saludable y sostenible.
        </p>
      </section>

      <section className="row g-4 mb-5">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 h-100 bg-light">
            <h3 className="fw-bold text-success mb-3">🌱 Nuestra Misión</h3>
            <p className="text-secondary mb-0">Nuestra misión es proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en todos los hogares chilenos.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 h-100 bg-light">
            <h3 className="fw-bold text-success mb-3">🌍 Nuestra Visión</h3>
            <p className="text-secondary mb-0">Nuestra visión es ser la tienda online líder en la distribución de productos frescos y naturales en Chile, reconocida por nuestra calidad excepcional, servicio al cliente y compromiso con la sostenibilidad. Aspiramos a expandir nuestra presencia a nivel nacional e internacional, estableciendo un nuevo estándar en la distribución de productos agrícolas directos del productor al consumidor.</p>
          </div>
        </div>
      </section>

      <section className="bg-light p-4 p-md-5 rounded shadow-sm mb-5">
        <h3 className="fw-bold text-dark mb-2 text-center">📍 Nuevas Tiendas y Puntos de Distribución</h3>
        <p className="text-muted text-center mb-4">Ubicaciones confirmadas en Santiago, Puerto Montt, Villarrica, Nacimiento, Viña del Mar, Valparaíso y Concepción.</p>
        <div className="row g-4 align-items-center">
          <div className="col-lg-5">
            <div className="accordion">
              {tiendas.map((t, i) => (
                <div className="accordion-item border-0 shadow-sm mb-2 rounded overflow-hidden" key={t.nombre}>
                  <h2 className="accordion-header">
                    <button type="button" className={`accordion-button fw-bold text-success ${abierta === i ? '' : 'collapsed'}`} onClick={() => setAbierta(abierta === i ? -1 : i)}>
                      {t.nombre}
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${abierta === i ? 'show' : ''}`}>
                    <div className="accordion-body text-secondary small">
                      <strong>Zona:</strong> {t.zona}<br />
                      <strong>Servicio:</strong> {t.servicio}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-7">
            <div className="map-container">
              <iframe src={MAPA_URL} title="Mapa de tiendas" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
