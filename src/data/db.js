// BASE DE DATOS SIMULADA - HuertoHogar

// Datos de ejemplo
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
  },
  {
    id: 3,
    codigo: 'LT001',
    nombre: 'Leche Entera',
    categoria: 'Lácteos',
    precio: 1500,
    stock: 50,
    stockCritico: 10,
    imagen: 'https://via.placeholder.com/150'
  }
];

let categorias = [
  { id: 1, nombre: 'Frutas' },
  { id: 2, nombre: 'Verduras' },
  { id: 3, nombre: 'Lácteos' },
  { id: 4, nombre: 'Orgánicos' }
];

let ordenes = [
  {
    id: 1,
    usuarioId: 1,
    usuarioNombre: 'Juan Pérez',
    fecha: '2024-11-07',
    total: 15400,
    estado: 'pendiente',
    productos: [
      { nombre: 'Manzanas Fuji', cantidad: 5, subtotal: 6000 },
      { nombre: 'Zanahorias Orgánicas', cantidad: 10, subtotal: 9000 }
    ]
  },
  {
    id: 2,
    usuarioId: 2,
    usuarioNombre: 'María González',
    fecha: '2024-11-08',
    total: 3000,
    estado: 'entregado',
    productos: [
      { nombre: 'Leche Entera', cantidad: 2, subtotal: 3000 }
    ]
  },
  {
    id: 3,
    usuarioId: 1,
    usuarioNombre: 'Juan Pérez',
    fecha: '2024-11-09',
    total: 1200,
    estado: 'cancelado',
    productos: [
      { nombre: 'Manzanas Fuji', cantidad: 1, subtotal: 1200 }
    ]
  }
];


// FUNCIONES CRUD PARA USUARIOS

export const obtenerUsuarios = () => [...usuarios];

export const obtenerUsuarioPorId = (id) => usuarios.find(u => u.id === id);

export const crearUsuario = (usuario) => {
  const nuevoUsuario = { 
    ...usuario, 
    id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1 
  };
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


// FUNCIONES DE AUTENTICACIÓN


export const login = (email, password) => {
  const usuario = usuarios.find(u => u.email === email && u.password === password);
  return usuario || null;
};

export const register = (datosUsuario) => {
  const existe = usuarios.find(u => u.email === datosUsuario.email);
  if (existe) return null;
  return crearUsuario({ ...datosUsuario, tipo: 'cliente' });
};


// FUNCIONES CRUD PARA PRODUCTOS

export const obtenerProductos = () => [...productos];

export const obtenerProductoPorId = (id) => productos.find(p => p.id === id);

export const crearProducto = (producto) => {
  const nuevoProducto = { 
    ...producto, 
    id: productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1,
    precio: parseFloat(producto.precio),
    stock: parseInt(producto.stock),
    stockCritico: parseInt(producto.stockCritico)
  };
  productos.push(nuevoProducto);
  return nuevoProducto;
};

export const actualizarProducto = (id, datosActualizados) => {
  const index = productos.findIndex(p => p.id === id);
  if (index !== -1) {
    productos[index] = { 
      ...productos[index], 
      ...datosActualizados,
      precio: parseFloat(datosActualizados.precio),
      stock: parseInt(datosActualizados.stock),
      stockCritico: parseInt(datosActualizados.stockCritico)
    };
    return productos[index];
  }
  return null;
};

export const eliminarProducto = (id) => {
  productos = productos.filter(p => p.id !== id);
};


// FUNCIONES CRUD PARA CATEGORÍAS

export const obtenerCategorias = () => [...categorias];

export const crearCategoria = (categoria) => {
  const nuevaCategoria = { 
    id: categorias.length > 0 ? Math.max(...categorias.map(c => c.id)) + 1 : 1,
    nombre: categoria.nombre.trim()
  };
  categorias.push(nuevaCategoria);
  return nuevaCategoria;
};

export const actualizarCategoria = (id, datosActualizados) => {
  const index = categorias.findIndex(c => c.id === id);
  if (index !== -1) {
    categorias[index] = { ...categorias[index], ...datosActualizados };
    return categorias[index];
  }
  return null;
};

export const eliminarCategoria = (id) => {
  categorias = categorias.filter(c => c.id !== id);
};


// FUNCIONES PARA ÓRDENES
export const obtenerOrdenes = () => [...ordenes];

export const obtenerOrdenesPorUsuario = (usuarioId) => 
  ordenes.filter(o => o.usuarioId === usuarioId);