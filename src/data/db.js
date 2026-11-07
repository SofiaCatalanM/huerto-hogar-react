// Base de datos simulada temporal

let usuarios = [
  {
    id: 1,
    rut: '12.345.678-9',
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan@example.com',
    password: '123456',
    tipo: 'cliente',
    direccion: 'Av. Siempre Viva 123',
    comuna: 'Santiago'
  },
  {
    id: 2,
    rut: '9.876.543-2',
    nombre: 'María',
    apellido: 'González',
    email: 'maria@example.com',
    password: '123456',
    tipo: 'administrador',
    direccion: 'Calle Falsa 456',
    comuna: 'Providencia'
  }
];

let productos = [
  {
    id: 1,
    codigo: 'FR001',
    nombre: 'Manzanas Fuji',
    categoria: 'Frutas',
    precio: 1200,
    stock: 150,
    stockCritico: 20,
    imagen: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    codigo: 'VR001',
    nombre: 'Zanahorias Orgánicas',
    categoria: 'Verduras',
    precio: 900,
    stock: 15,
    stockCritico: 20,
    imagen: 'https://via.placeholder.com/150'
  }
];

let categorias = ['Frutas', 'Verduras', 'Lácteos', 'Orgánicos'];

let ordenes = [
  {
    id: 1,
    usuarioId: 1,
    fecha: '2024-11-07',
    total: 15400,
    estado: 'pendiente',
    productos: [
      { productoId: 1, cantidad: 5, subtotal: 6000 },
      { productoId: 2, cantidad: 10, subtotal: 9000 }
    ]
  }
];

// Funciones CRUD para Usuarios
export const obtenerUsuarios = () => [...usuarios];

export const obtenerUsuarioPorId = (id) => usuarios.find(u => u.id === id);

export const crearUsuario = (usuario) => {
  const nuevoUsuario = { ...usuario, id: usuarios.length + 1 };
  usuarios.push(nuevoUsuario);
  return nuevoUsuario;
};

export const actualizarUsuario = (id, datosActualizados) => {
  const index = usuarios.findIndex(u => u.id === id);
  if (index !== -1) {
    usuarios[index] = { ...usuarios[index], ...datosActualizados };
    return usuarios[index];
  }
  return null;
};

export const eliminarUsuario = (id) => {
  usuarios = usuarios.filter(u => u.id !== id);
};

// Funciones CRUD para Productos
export const obtenerProductos = () => [...productos];

export const obtenerProductoPorId = (id) => productos.find(p => p.id === id);

export const crearProducto = (producto) => {
  const nuevoProducto = { ...producto, id: productos.length + 1 };
  productos.push(nuevoProducto);
  return nuevoProducto;
};

export const actualizarProducto = (id, datosActualizados) => {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos[index] = { ...productos[index], ...datosActualizados };
    return productos[index];
  }
  return null;
};

export const eliminarProducto = (id) => {
  productos = productos.filter(p => p.id !== id);
};

// Funciones para Categorías
export const obtenerCategorias = () => [...categorias];

export const crearCategoria = (categoria) => {
  if (!categorias.includes(categoria)) {
    categorias.push(categoria);
    return true;
  }
  return false;
};

// Funciones para Órdenes
export const obtenerOrdenes = () => [...ordenes];

export const obtenerOrdenesPorUsuario = (usuarioId) => 
  ordenes.filter(o => o.usuarioId === usuarioId);

// Función de autenticación
export const login = (email, password) => {
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  return usuario || null;
};

export const register = (datosUsuario) => {
  const existe = usuarios.find(u => u.email === datosUsuario.email);
  if (existe) return null;
  return crearUsuario({ ...datosUsuario, tipo: 'cliente' });
};