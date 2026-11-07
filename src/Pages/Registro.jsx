import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../data/db';

function Registro() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    confirmPassword: '',
    direccion: '',
    comuna: ''
  });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const validarRUT = (rut) => {
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');
    if (rutLimpio.length < 7 || rutLimpio.length > 9) return false;
    if (!rut.includes('-')) return false;
    const rutRegex = /^(\d{1,2})(\d{3})(\d{3})-[\dkK]$/;
    return rutRegex.test(rut);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validarRUT(formData.rut)) {
      nuevosErrores.rut = 'Formato de RUT invalido. Use: 12.345.678-9';
    }
    if (formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    if (formData.apellido.trim().length < 3) {
      nuevosErrores.apellido = 'El apellido debe tener al menos 3 caracteres';
    }
    if (!emailRegex.test(formData.email)) {
      nuevosErrores.email = 'Ingresa un email valido';
    }
    if (formData.password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    if (formData.password !== formData.confirmPassword) {
      nuevosErrores.confirmPassword = 'Las contraseñas no coinciden';
    }
    if (formData.direccion.trim().length < 5) {
      nuevosErrores.direccion = 'La direccion debe tener al menos 5 caracteres';
    }
    if (formData.comuna.trim().length < 3) {
      nuevosErrores.comuna = 'La comuna debe tener al menos 3 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errores[e.target.name]) {
      setErrores({ ...errores, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrores({});

    if (validarFormulario()) {
      const { confirmPassword, ...datosUsuario } = formData;
      const nuevoUsuario = register(datosUsuario);

      if (nuevoUsuario) {
        alert('Registro exitoso. Ahora puedes iniciar sesion.');
        navigate('/login');
      } else {
        setErrores({ general: 'El email ya esta registrado' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Registro de Usuario</h3>
            </div>
            <div className="card-body">
              {errores.general && (
                <div className="alert alert-danger" role="alert">
                  {errores.general}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="rut" className="form-label">RUT</label>
                    <input
                      type="text"
                      className={`form-control ${errores.rut ? 'is-invalid' : ''}`}
                      id="rut"
                      name="rut"
                      value={formData.rut}
                      onChange={handleChange}
                      placeholder="12.345.678-9"
                      required
                    />
                    {errores.rut && <div className="invalid-feedback">{errores.rut}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ejemplo@correo.com"
                      required
                    />
                    {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                      type="text"
                      className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                    {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="apellido" className="form-label">Apellido</label>
                    <input
                      type="text"
                      className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      required
                    />
                    {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${errores.confirmPassword ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    {errores.confirmPassword && <div className="invalid-feedback">{errores.confirmPassword}</div>}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="direccion" className="form-label">Direccion</label>
                    <input
                      type="text"
                      className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleChange}
                      required
                    />
                    {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="comuna" className="form-label">Comuna</label>
                    <input
                      type="text"
                      className={`form-control ${errores.comuna ? 'is-invalid' : ''}`}
                      id="comuna"
                      name="comuna"
                      value={formData.comuna}
                      onChange={handleChange}
                      required
                    />
                    {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Registrarse
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="mb-0">
                  Ya tienes cuenta?{' '}
                  <Link to="/login" className="text-primary">
                    Inicia sesion aqui
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;