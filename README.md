# HuertoHogar – Frontend (React + Vite)

## Cómo correrlo
```bash
npm install
npm run dev      # http://localhost:5173
```

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
