import React, { useState, useEffect } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { obtenerUsuarios, eliminarUsuario } from '../../data/db';

function Users() {
  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const datos = obtenerUsuarios();
    setUsuarios(datos);
  }, []);

  // Función para manejar la eliminación
  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      eliminarUsuario(id);
      // Actualizar el estado local para reflejar el cambio en la UI
      setUsuarios(obtenerUsuarios());
    }
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Gestión de Usuarios</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-outline-primary">
            Exportar a CSV
          </button>
          <button type="button" className="btn btn-sm btn-success ms-2">
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
                    <button className="btn btn-sm btn-warning me-2">Editar</button>
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
    </AdminLayout>
  );
}

export default Users;