import { Link } from 'react-router-dom'

const tarjetas = [
  { titulo: 'Productos Activos', valor: 124, nota: '+5 esta semana', borde: 'success', clase: 'text-success' },
  { titulo: 'Usuarios Registrados', valor: 45, nota: '3 nuevos hoy', borde: 'primary', clase: 'text-primary' },
  { titulo: 'Stock Crítico', valor: 3, nota: 'Requieren atención', borde: 'warning', clase: 'text-danger' },
  { titulo: 'Mensajes Nuevos', valor: 3, nota: 'Sin leer', borde: 'info', clase: 'text-muted' },
]

const accesos = [
  { to: '/admin/usuarios', titulo: 'Gestionar Usuarios', texto: 'Validar RUN, asignar roles y administrar cuentas.' },
  { to: '/admin/productos', titulo: 'Gestionar Productos', texto: 'Control de stock, precios y alertas de inventario.' },
  { to: '/admin/mensajes', titulo: 'Bandeja de Mensajes', texto: 'Revisar consultas y solicitudes de clientes.' },
]

export default function AdminHome() {
  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="display-5 fw-bold mb-2">Dashboard Principal</h1>
        <p className="lead text-secondary">Bienvenido al panel de gestión de HuertoHogar.</p>
      </header>

      <section className="row g-4 mb-5">
        {tarjetas.map((t) => (
          <article className="col-md-3 col-sm-6" key={t.titulo}>
            <div className={`card shadow-sm border-start border-4 border-${t.borde} h-100`}>
              <div className="card-body">
                <h6 className="text-muted text-uppercase mb-1">{t.titulo}</h6>
                <h2 className="mb-0">{t.valor}</h2>
                <small className={t.clase}>{t.nota}</small>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="mb-5">
        <h5 className="fw-bold mb-3">Accesos Rápidos a Gestión</h5>
        <div className="row g-4">
          {accesos.map((a) => (
            <div className="col-md-4" key={a.to}>
              <Link to={a.to} className="text-decoration-none">
                <div className="card h-100 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">{a.titulo}</h5>
                    <p className="card-text text-muted">{a.texto}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
