import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

describe('Prueba Unitaria Principal', () => {
  
  test('Debe renderizar la tarjeta mostrando el nombre y precio del producto', () => {
    
    // PASO 1: PREPARAR (Configuramos datos falsos o "mock" para la prueba)
    const productoFalso = {
      id: 1,
      nombre: 'Cajón de Tomates',
      categoria: 'Verduras',
      precio: 12000,
      unidad: 'cajón',
      descripcion: 'Tomates frescos de la huerta.',
      imagen: '/images/tomates.jpg'
    };

    // PASO 2: EJECUTAR (Cargamos el componente en un entorno virtual)
    render(<ProductCard producto={productoFalso} onAgregar={vi.fn()} />);
    
    // PASO 3: COMPROBAR (Buscamos que lo que vemos en pantalla sea correcto)
    const nombreEnPantalla = screen.getByText('Cajón de Tomates');
    const precioEnPantalla = screen.getByText('$12.000', { exact: false });

    // Afirmamos que ambos textos realmente existen dentro del documento
    expect(nombreEnPantalla).toBeInTheDocument();
    expect(precioEnPantalla).toBeInTheDocument();
  });

});