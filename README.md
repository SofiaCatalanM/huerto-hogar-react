# HuertoHogar - Tienda Online Frontend

Proyecto de la asignatura DSY1104 Desarrollo Fullstack II, Duoc UC.
Plataforma web e-commerce para la venta de productos agricolas, migrada a React.

## Integrantes
- Ariel Ulloa
- Ashley Garrido
- Sofia Catalan

## Tecnologias Utilizadas
- React 18
- Vite
- React Router 6
- Bootstrap 5
- Vitest y React Testing Library
- LocalStorage para persistencia de datos simulada

## Instalacion y Ejecucion

1. Clonar el repositorio.
2. Instalar las dependencias del proyecto:
   npm install
3. Iniciar el servidor de desarrollo:
   npm run dev
4. Generar la version de produccion:
   npm run build

## Pruebas Unitarias y Cobertura

Ejecutar el suite de pruebas:
npm run test

Generar el reporte de cobertura de codigo:
npm run coverage

## Credenciales de Prueba para el Panel Administrativo

Para acceder al panel de administracion, utilice las siguientes credenciales de prueba cargadas en la base de datos simulada:

Correo: maria@example.com
Contrasena: 123456

## Arquitectura del Proyecto

El codigo fuente se organiza en la carpeta src de la siguiente manera:

- components: Componentes reutilizables de la interfaz (Navbar, Footer, Layout, AdminLayout, modales).
- pages: Vistas principales de la tienda publica y del panel de administracion.
- context: Manejo del estado global, especificamente el carrito de compras.
- data: Capa de abstraccion de datos (db.js) que simula operaciones CRUD sobre LocalStorage.
- utils: Funciones de validacion de formularios y calculos de precios.

## Estructura
```
huerto-hogar-react/
├── index.html            ← en la RAÍZ; contiene <div id="root"> y carga /src/main.jsx
├── package.json
├── vite.config.js
├── public/img/           ← imágenes (se usan como "/img/archivo.jpg")
└── src/
    ├── main.jsx          ← punto de entrada (Router + CartProvider + CSS)
    ├── App.jsx           ← definición de rutas
    ├── styles/styles.css ← tu css original
    ├── components/       ← Navbar, Footer, Layout, Modal, ProductCard
    ├── context/          ← CartContext (carrito global, reemplaza cart.js)
    ├── data/             ← productos, blogs, tiendas, regiones
    ├── pages/            ← una página por cada .html original
    └── utils/            ← validaciones y helpers de localStorage
```

## Equivalencias HTML → React
| Antes                 | Ahora                      | Ruta              |
|-----------------------|----------------------------|-------------------|
| index.html + main.js  | pages/Home.jsx             | /                 |
| carrito.html + cart.js| pages/Carrito.jsx          | /carrito          |
| blogs.html            | pages/Blogs.jsx            | /blogs            |
| nosotros.html         | pages/Nosotros.jsx         | /nosotros         |
| login.html            | pages/Login.jsx            | /login            |
| registro.html         | pages/Registro.jsx         | /registro         |
| admin-home.html       | pages/AdminHome.jsx        | /admin            |
| admin-productos.html  | pages/AdminProductos.jsx   | /admin/productos  |
| admin-usuarios.html   | pages/AdminUsuarios.jsx    | /admin/usuarios   |
| mensajes.html         | pages/Mensajes.jsx         | /admin/mensajes   |
