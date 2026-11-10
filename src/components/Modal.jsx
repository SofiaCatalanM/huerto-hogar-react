// Modal simple con clases de Bootstrap (sin necesitar bootstrap.js)
export default function Modal({ abierto, titulo, onCerrar, children, pie, grande = true }) {
  if (!abierto) return null
  return (
    <>
      <div className="modal d-block" tabIndex="-1" onClick={onCerrar}>
        <div className={`modal-dialog modal-dialog-centered ${grande ? 'modal-lg' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">{titulo}</h5>
              <button type="button" className="btn-close btn-close-white" onClick={onCerrar} aria-label="Cerrar"></button>
            </div>
            <div className="modal-body">{children}</div>
            {pie && <div className="modal-footer">{pie}</div>}
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}
