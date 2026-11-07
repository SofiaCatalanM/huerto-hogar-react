import React, { useState, useEffect } from 'react';

function CategoryForm({ categoria, onGuardar, onCancelar }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
    } else {
      setNombre('');
    }
    setError('');
  }, [categoria]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const nombreLimpio = nombre.trim();
    if (nombreLimpio.length < 3) {
      setError('El nombre de la categoría debe tener al menos 3 caracteres');
      return;
    }
    if (nombreLimpio.length > 50) {
      setError('El nombre de la categoría no puede exceder 50 caracteres');
      return;
    }

    onGuardar({ nombre: nombreLimpio });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre de la Categoría *</label>
        <input
          type="text"
          className={`form-control ${error ? 'is-invalid' : ''}`}
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej: Frutas Frescas"
          required
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {categoria ? 'Actualizar Categoría' : 'Crear Categoría'}
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;