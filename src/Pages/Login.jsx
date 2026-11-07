import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../data/db';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const usuario = login(email, password);
    
    if (usuario) {
      // Se guarda la sesión en localStorage
      localStorage.setItem('usuarioActual', JSON.stringify(usuario));
      
      // Redirigir según el tipo de usuario
      if (usuario.tipo === 'administrador') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-success text-white">
              <h3 className="mb-0">Iniciar Sesión</h3>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-success w-100">
                  Iniciar Sesión
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="mb-0">
                  ¿No tienes cuenta?{' '}
                  <a href="/register" className="text-success">
                    Regístrate aquí
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;