import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenerUsuarioPorId, actualizarUsuario } from '../../data/db';

function Profile() {
  const [usuario, setUsuario] = useState(null);
  const [formData, setFormData] = useState({});
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioLogueado = JSON.parse(localStorage.getItem('usuarioActual'));
    
    // Si no hay usuario logueado, redirigir al login
    if (!usuarioLogueado) {
      navigate('/login');
      return;
    }

    const datosFrescos = obtenerUsuarioPorId(usuarioLogueado.id);
    
    // Si el usuario no existe en la base de datos simulada, limpiar sesion y redirigir
    if (!datosFrescos) {
      localStorage.removeItem('usuarioActual');
      navigate('/login');
      return;
    }

    setUsuario(datosFrescos);
    setFormData({
      ...datosFrescos,
      password: ''
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario) {
      const datosActualizados = { ...formData };
      if (!datosActualizados.password) {
        delete datosActualizados.password;
      }
      actualizarUsuario(usuario.id, datosActualizados);
      
      const usuarioActualizado = obtenerUsuarioPorId(usuario.id);
      localStorage.setItem('usuarioActual', JSON.stringify(usuarioActualizado));
      setUsuario(usuarioActualizado);
      setMensaje('Perfil actualizado correctamente.');
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  if (!usuario) {
    return (
      <>
        <div className="text-center mt-5">
          <p>Cargando perfil...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Mi Perfil</h1>
      </div>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}

      <div className="row">
        <div className="col-md-4">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <div className="mb-3">
                <img 
                  src="https://via.placeholder.com/150" 
                  alt="Foto de perfil" 
                  className="rounded-circle border p-1"
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
              <h4 className="mb-1">{usuario.nombre} {usuario.apellido}</h4>
              <p className="text-muted mb-3">
                <span className={`badge ${usuario.tipo === 'administrador' ? 'bg-danger' : 'bg-primary'}`}>
                  {usuario.tipo}
                </span>
              </p>
              <p className="text-muted small mb-0">ID: {usuario.id}</p>
              <p className="text-muted small">RUT: {usuario.rut}</p>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Editar Informacion Personal</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input type="text" className="form-control" id="apellido" name="apellido" value={formData.apellido || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input type="text" className="form-control" id="direccion" name="direccion" value={formData.direccion || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <input type="text" className="form-control" id="comuna" name="comuna" value={formData.comuna || ''} onChange={handleChange} required />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="password" className="form-label">Nueva Contraseña (dejar en blanco para no cambiar)</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password || ''} onChange={handleChange} />
                  </div>
                </div>
                <div className="mt-4 text-end">
                  <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;