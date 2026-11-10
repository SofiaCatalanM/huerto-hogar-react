export function leer(clave, porDefecto) {
  try {
    const v = localStorage.getItem(clave)
    return v ? JSON.parse(v) : porDefecto
  } catch {
    return porDefecto
  }
}

export function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}
