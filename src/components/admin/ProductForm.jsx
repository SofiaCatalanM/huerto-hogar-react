import React, { useState, useEffect } from 'react';

function ProductForm({ producto, onGuardar, onCancelar }) {
  const initialState = {
    codigo: '',
    nombre: '',
    categoria: '',
    precio: '',
    stock: '',
    stockCritico: '',
    imagen: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (producto) {
      setFormData({
        ...producto,
        precio: producto.precio.toString(),
        stock: producto.stock.toString(),
        stockCritico: producto.stockCritico.toString()
      });
    } else {
      setFormData(initialState);
    }
    setErrores({});
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errores[name]) {
      setErrores({ ...errores, [name]: '' });
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (!formData.codigo || formData.codigo.trim().length < 3) {
      nuevosErrores.codigo = 'El codigo debe tener al menos 3 caracteres';
    }
    if (!formData.nombre || formData.nombre.trim().length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 caracteres';
    }
    if (!formData.categoria || formData.categoria.trim().length < 3) {
      nuevosErrores.categoria = 'La categoria es obligatoria';
    }
    
    const precio = parseFloat(formData.precio);
    if (isNaN(precio) || precio <= 0) {
      nuevosErrores.precio = 'El precio debe ser un numero mayor a 0';
    }

    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      nuevosErrores.stock = 'El stock debe ser un numero valido (0 o mas)';
    }

    const stockCritico = parseInt(formData.stockCritico);
    if (isNaN(stockCritico) || stockCritico < 0) {
      nuevosErrores.stockCritico = 'El stock critico debe ser un numero valido';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      onGuardar(formData);
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
          <label htmlFor="codigo" className="form-label">Codigo *</label>
          <input
            type="text"
            className={`form-control ${errores.codigo ? 'is-invalid' : ''}`}
            id="codigo"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            placeholder="Ej: FR001"
            required
          />
          {errores.codigo && <div className="invalid-feedback">{errores.codigo}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="categoria" className="form-label">Categoria *</label>
          <input
            type="text"
            className={`form-control ${errores.categoria ? 'is-invalid' : ''}`}
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            placeholder="Ej: Frutas"
            required
          />
          {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
        </div>

        <div className="col-md-12">
          <label htmlFor="nombre" className="form-label">Nombre del Producto *</label>
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

        <div className="col-md-4">
          <label htmlFor="precio" className="form-label">Precio *</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errores.precio ? 'is-invalid' : ''}`}
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="0.00"
            required
          />
          {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="stock" className="form-label">Stock Actual *</label>
          <input
            type="number"
            className={`form-control ${errores.stock ? 'is-invalid' : ''}`}
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
          {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="stockCritico" className="form-label">Stock Critico *</label>
          <input
            type="number"
            className={`form-control ${errores.stockCritico ? 'is-invalid' : ''}`}
            id="stockCritico"
            name="stockCritico"
            value={formData.stockCritico}
            onChange={handleChange}
            required
          />
          {errores.stockCritico && <div className="invalid-feedback">{errores.stockCritico}</div>}
        </div>

        <div className="col-md-12">
          <label htmlFor="imagen" className="form-label">URL de Imagen (Opcional)</label>
          <input
            type="url"
            className="form-control"
            id="imagen"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-success">
          {producto ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;