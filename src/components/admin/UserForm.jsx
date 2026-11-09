import React, { useState, useEffect } from 'react';

function UserForm({ usuario, onGuardar, onCancelar }) {
  const initialState = {
    rut: '',
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    tipo: 'cliente',
    direccion: '',
    comuna: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errores, setErrores] = useState({});

  // Cargar datos si es edición
  useEffect(() => {
    if (usuario) {
      setFormData({
        ...usuario,
        password: '' 
      });
    } else {
      setFormData(initialState);
    }
    setErrores({});
  }, [usuario]);

 
  // Validación de RUT 
  const validarRUT = (rut) => {
    // Eliminar puntos y guión para validar largo
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');
    
    if (rutLimpio.length < 7 || rutLimpio.length > 9) {
      return { valido: false, mensaje: 'RUT debe tener entre 7 y 9 dígitos' };
    }

    if (!rut.includes('-')) {
      return { valido: false, mensaje: 'RUT debe incluir guión y dígito verificador (ej: 12.345.678-9)' };
    }

    
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    if (!rutRegex.test(rut)) {
      return { valido: false, mensaje: 'Formato de RUT inválido. Use: 12.345.678-9' };
    }

    return { valido: true, mensaje: '' };
  };

  // Validación de email
  const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valido: false, mensaje: 'Email debe contener @ y un dominio válido' };
    }
    return { valido: true, mensaje: '' };
  };

  // Validación de texto (nombre, apellido, dirección, comuna)
  const validarTexto = (valor, campo, minimo, maximo) => {
    if (!valor || valor.trim().length === 0) {
      return { valido: false, mensaje: `${campo} es obligatorio` };
    }
    if (valor.trim().length < minimo) {
      return { valido: false, mensaje: `${campo} debe tener al menos ${minimo} caracteres` };
    }
    if (valor.trim().length > maximo) {
      return { valido: false, mensaje: `${campo} no puede exceder ${maximo} caracteres` };
    }
    return { valido: true, mensaje: '' };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario escribe
    if (errores[name]) {
      setErrores({
        ...errores,
        [name]: ''
      });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar RUT
    const validacionRUT = validarRUT(formData.rut);
    if (!validacionRUT.valido) {
      nuevosErrores.rut = validacionRUT.mensaje;
    }

    // Validar Nombre (3-50 caracteres)
    const validacionNombre = validarTexto(formData.nombre, 'Nombre', 3, 50);
    if (!validacionNombre.valido) {
      nuevosErrores.nombre = validacionNombre.mensaje;
    }

    // Validar Apellido (3-50 caracteres)
    const validacionApellido = validarTexto(formData.apellido, 'Apellido', 3, 50);
    if (!validacionApellido.valido) {
      nuevosErrores.apellido = validacionApellido.mensaje;
    }

    // Validar Email
    const validacionEmail = validarEmail(formData.email);
    if (!validacionEmail.valido) {
      nuevosErrores.email = validacionEmail.mensaje;
    }

    // Validar Contraseña (solo si es nuevo usuario)
    if (!usuario) {
      if (!formData.password || formData.password.length < 6) {
        nuevosErrores.password = 'Contraseña debe tener al menos 6 caracteres';
      }
      if (formData.password && formData.password.length > 50) {
        nuevosErrores.password = 'Contraseña no puede exceder 50 caracteres';
      }
    } else if (formData.password && formData.password.length > 50) {
      nuevosErrores.password = 'Contraseña no puede exceder 50 caracteres';
    }

    // Validar Dirección 
    const validacionDireccion = validarTexto(formData.direccion, 'Dirección', 5, 100);
    if (!validacionDireccion.valido) {
      nuevosErrores.direccion = validacionDireccion.mensaje;
    }

    // Validar Comuna 
    const validacionComuna = validarTexto(formData.comuna, 'Comuna', 3, 50);
    if (!validacionComuna.valido) {
      nuevosErrores.comuna = validacionComuna.mensaje;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      onGuardar(formData);
    } else {
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {Object.keys(errores).length > 0 && (
        <div className="alert alert-danger">
          <strong>Errores encontrados:</strong>
          <ul className="mb-0 mt-2">
            {Object.values(errores).map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="rut" className="form-label">RUT *</label>
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
          <label htmlFor="tipo" className="form-label">Tipo de Usuario *</label>
          <select
            className="form-select"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="cliente">Cliente</option>
            <option value="administrador">Administrador</option>
            <option value="vendedor">Vendedor</option>
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="nombre" className="form-label">Nombre *</label>
          <input
            type="text"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingrese su nombre"
            required
          />
          {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="apellido" className="form-label">Apellido *</label>
          <input
            type="text"
            className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder="Ingrese su apellido"
            required
          />
          {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
        </div>

        <div className="col-md-12">
          <label htmlFor="email" className="form-label">Email *</label>
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

        <div className="col-md-12">
          <label htmlFor="password" className="form-label">
            {usuario ? 'Nueva Contraseña (dejar en blanco para no cambiar)' : 'Contraseña *'}
          </label>
          <input
            type="password"
            className={`form-control ${errores.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required={!usuario}
          />
          {errores.password && <div className="invalid-feedback">{errores.password}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="direccion" className="form-label">Dirección *</label>
          <input
            type="text"
            className={`form-control ${errores.direccion ? 'is-invalid' : ''}`}
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Calle, número, departamento"
            required
          />
          {errores.direccion && <div className="invalid-feedback">{errores.direccion}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="comuna" className="form-label">Comuna *</label>
          <input
            type="text"
            className={`form-control ${errores.comuna ? 'is-invalid' : ''}`}
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleChange}
            placeholder="Ej: Santiago, Providencia"
            required
          />
          {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {usuario ? 'Actualizar Usuario' : 'Crear Usuario'}
        </button>
      </div>
    </form>
  );
}

export default UserForm;