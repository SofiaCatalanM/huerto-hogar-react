import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import ProductForm from '../../components/admin/ProductForm';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../../data/db';

function Products() {
  const [productos, setProductos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEdicion, setProductoEdicion] = useState(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = () => {
    setProductos(obtenerProductos());
  };

  const handleAbrirModalNuevo = () => {
    setProductoEdicion(null);
    setMostrarModal(true);
  };

  const handleAbrirModalEdicion = (producto) => {
    setProductoEdicion(producto);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setProductoEdicion(null);
  };

  const handleGuardarProducto = (datosProducto) => {
    if (productoEdicion) {
      actualizarProducto(productoEdicion.id, datosProducto);
    } else {
      crearProducto(datosProducto);
    }
    cargarProductos();
    handleCerrarModal();
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estas seguro de que deseas eliminar este producto?')) {
      eliminarProducto(id);
      cargarProductos();
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestion de Productos</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button 
            type="button" 
            className="btn btn-sm btn-success"
            onClick={handleAbrirModalNuevo}
          >
            + Nuevo Producto
          </button>
        </div>
      </div>

      <div className="alert alert-info">
        <strong>Nota:</strong> Las filas resaltadas en rojo indican productos con stock critico o agotado.
      </div>

      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Stock Critico</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map((producto) => {
                // Logica para resaltar stock critico
                const esCritico = producto.stock <= producto.stockCritico;
                const filaClase = esCritico ? 'table-danger' : '';
                
                return (
                  <tr key={producto.id} className={filaClase}>
                    <td>{producto.codigo}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.categoria}</td>
                    <td>${producto.precio.toLocaleString()}</td>
                    <td>
                      <strong>{producto.stock}</strong>
                      {esCritico && <span className="badge bg-danger ms-2">CRITICO</span>}
                    </td>
                    <td>{producto.stockCritico}</td>
                    <td className="text-end">
                      <button 
                        className="btn btn-sm btn-warning me-2" 
                        onClick={() => handleAbrirModalEdicion(producto)}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleEliminar(producto.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No hay productos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {mostrarModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {productoEdicion ? 'Editar Producto' : 'Nuevo Producto'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCerrarModal}></button>
              </div>
              <div className="modal-body">
                <ProductForm 
                  producto={productoEdicion} 
                  onGuardar={handleGuardarProducto} 
                  onCancelar={handleCerrarModal} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Products;