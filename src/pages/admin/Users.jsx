import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import UserForm from '../../components/admin/UserForm';
import { obtenerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from '../../data/db';

function Users() {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [usuarioEdicion, setUsuarioEdicion] = useState(null);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = () => {
    const datos = obtenerUsuarios();
    setUsuarios(datos);
  };

  const handleAbrirModalNuevo = () => {
    setUsuarioEdicion(null);
    setMostrarModal(true);
  };

  const handleAbrirModalEdicion = (usuario) => {
    setUsuarioEdicion(usuario);
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
    setUsuarioEdicion(null);
  };

  const handleGuardarUsuario = (datosUsuario) => {
    if (usuarioEdicion) {
      actualizarUsuario(usuarioEdicion.id, datosUsuario);
    } else {
      crearUsuario(datosUsuario);
    }
    
    cargarUsuarios();
    handleCerrarModal();
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      eliminarUsuario(id);
      cargarUsuarios();
    }
  };

  return (
    <AdminLayout>
      {/* Contenido principal de la página */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestión de Usuarios</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button 
            type="button" 
            className="btn btn-sm btn-success"
            onClick={handleAbrirModalNuevo}
          >
            + Nuevo Usuario
          </button>
        </div>
      </div>

      <div className="table-responsive bg-white p-3 rounded shadow-sm">
        <table className="table table-striped table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>RUT</th>
              <th>Nombre Completo</th>
              <th>Email</th>
              <th>Tipo</th>
              <th>Comuna</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.rut}</td>
                  <td>{usuario.nombre} {usuario.apellido}</td>
                  <td>{usuario.email}</td>
                  <td>
                    <span className={`badge ${usuario.tipo === 'administrador' ? 'bg-danger' : 'bg-primary'}`}>
                      {usuario.tipo}
                    </span>
                  </td>
                  <td>{usuario.comuna}</td>
                  <td className="text-end">
                    <button 
                      className="btn btn-sm btn-warning me-2" 
                      onClick={() => handleAbrirModalEdicion(usuario)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-sm btn-danger" 
                      onClick={() => handleEliminar(usuario.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No hay usuarios registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL - Debe estar AQUÍ, como overlay, NO dentro de otro AdminLayout */}
      {mostrarModal && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1050
          }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {usuarioEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCerrarModal}
                ></button>
              </div>
              <div className="modal-body">
                <UserForm 
                  usuario={usuarioEdicion} 
                  onGuardar={handleGuardarUsuario} 
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

export default Users;