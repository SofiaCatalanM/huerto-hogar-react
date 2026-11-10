import { createContext, useContext, useEffect, useState } from 'react'
import { leer, guardar } from '../utils/storage.js'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => leer('carrito', []))
  const [toast, setToast] = useState(null)

  useEffect(() => {
    guardar('carrito', items)
  }, [items])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(t)
  }, [toast])

  const agregar = (prod, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === prod.id)
      if (existe) return prev.map((i) => (i.id === prod.id ? { ...i, cantidad: i.cantidad + cantidad } : i))
      const { id, nombre, precio, unidad, imagen } = prod
      return [...prev, { id, nombre, precio, unidad, imagen, cantidad }]
    })
    setToast(`${cantidad} x ${prod.nombre}`)
  }

  const cambiarCantidad = (id, cantidad) =>
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, cantidad } : i)))

  const eliminar = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const vaciar = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.cantidad, 0)
  const total = items.reduce((s, i) => s + i.precio * i.cantidad, 0)

  return (
    <CartContext.Provider value={{ items, agregar, cambiarCantidad, eliminar, vaciar, totalItems, total, toast, cerrarToast: () => setToast(null) }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}
