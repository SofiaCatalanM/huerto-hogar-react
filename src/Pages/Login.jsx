import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../data/db';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  const validarFormulario = () => {
    const nuevosErrores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      nuevosErrores.email = 'Ingresa un email valido con formato ejemplo@correo.com';
    }

    if (password.length < 6) {
      nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrores({});

    if (validarFormulario()) {
      const usuario = login(email, password);
      console.log("Resultado del login:", usuario);

      if (usuario) {
        localStorage.setItem('usuarioActual', JSON.stringify(usuario));
        if (usuario.tipo === 'administrador') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErrores({ general: 'Email o contraseña incorrectos' });
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-white" style={{ backgroundColor: '#2d6a4f' }}>
              <h3 className="mb-0">Iniciar Sesion</h3>
            </div>
            <div className="card-body">
              {errores.general && (
                <div className="alert alert-danger" role="alert">
                  {errores.general}
                </div>
              )}
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errores.email ? 'is-invalid' : ''}`}
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    required
                  />
                  {errores.email && <div className="invalid-feedback">{errores.email}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className={`form-control ${errores.password ? 'is-invalid' : ''}`}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimo 6 caracteres"
                    required
                  />
                  {errores.password && <div className="invalid-feedback">{errores.password}</div>}
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Iniciar Sesion
                </button>
              </form>
              <div className="mt-3 text-center">
                <p className="mb-0">
                  No tienes cuenta?{' '}
                  <Link to="/registro" className="text-primary">
                    Registrate aqui
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

export default Login;