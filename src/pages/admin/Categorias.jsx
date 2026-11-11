import React, { useState, useEffect } from 'react';

import CategoryForm from '../../components/admin/CategoriaForm';
import { obtenerCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from '../../data/db';

function Categories() {
  const [categorias, setCategorias] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriaEdicion, setCategoriaEdicion] = useState(null);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = () => {
    setCategorias(obtenerCategorias());
  };

  const handleAbrirModalNuevo = () => {
    setCategoriaEdicion(null);
    setMostrarModal(true);
  };

  const handleAbrirModalEdicion = (categoria) => {
    setCategoriaEdicion(categoria);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setCategoriaEdicion(null);
  };

  const handleGuardarCategoria = (datosCategoria) => {
    if (categoriaEdicion) {
      actualizarCategoria(categoriaEdicion.id, datosCategoria);
    } else {
      crearCategoria(datosCategoria);
    }
    cargarCategorias();
    handleCerrarModal();
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estas seguro de que deseas eliminar esta categoría?')) {
      eliminarCategoria(id);
      cargarCategorias();
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestión de Categorías</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button 
            type="button" 
            className="btn btn-sm btn-success"
            onClick={handleAbrirModalNuevo}
          >
            + Nueva Categoría
          </button>
        </div>
      </div>

      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre de la Categoría</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.length > 0 ? (
              categorias.map((categoria) => (
                <tr key={categoria.id}>
                  <td>{categoria.id}</td>
                  <td>{categoria.nombre}</td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-warning me-2" 
                      onClick={() => handleAbrirModalEdicion(categoria)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleEliminar(categoria.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">No hay categorías registradas.</td>
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {categoriaEdicion ? 'Editar Categoría' : 'Nueva Categoría'}
                </h5>
                <button type="button" className="btn-close" onClick={handleCerrarModal}></button>
              </div>
              <div className="modal-body">
                <CategoryForm 
                  categoria={categoriaEdicion} 
                  onGuardar={handleGuardarCategoria} 
                  onCancelar={handleCerrarModal} 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Categories;