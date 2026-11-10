import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import ProductCard from './ProductCard';

describe('Prueba Unitaria Principal', () => {
  
  test('Debe renderizar la tarjeta mostrando el nombre y precio del producto', () => {
    
    // PASO 1: PREPARAR (Configuramos datos falsos o "mock" para la prueba)
    const productoFalso = {
      id: 1,
      name: 'Cajón de Tomates',
      category: 'Verduras',
      price: 12000,
      description: 'Tomates frescos de la huerta.',
      image: '/images/tomates.jpg'
    };

    // PASO 2: EJECUTAR (Cargamos el componente en un entorno virtual)
    render(<ProductCard product={productoFalso} addToCart={vi.fn()} />);
    
    // PASO 3: COMPROBAR (Buscamos que lo que vemos en pantalla sea correcto)
    const nombreEnPantalla = screen.getByText('Cajón de Tomates');
    const precioEnPantalla = screen.getByText('$12.000');

    // Afirmamos que ambos textos realmente existen dentro del documento
    expect(nombreEnPantalla).toBeInTheDocument();
    expect(precioEnPantalla).toBeInTheDocument();
  });

});