export const esCorreoValido = (c) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) &&
  ['@duoc.cl', '@profesor.duoc.cl', '@gmail.com'].some((d) => c.toLowerCase().endsWith(d))

export const esPasswordValida = (p) => p.length >= 4 && p.length <= 10

// Formato simple (7-8 dígitos + verificador), usado en el registro
export const esRunFormatoValido = (run) => /^[0-9]{7,8}[0-9Kk]$/.test(run)

// Validación módulo 11 (usada en admin de usuarios)
export function validarRUN(runEntrada) {
  const run = runEntrada.replace(/[.\-\s]/g, '').toUpperCase()
  if (run.length < 7 || run.length > 9) return false
  const cuerpo = run.slice(0, -1)
  const dv = run.slice(-1)
  if (!/^\d+$/.test(cuerpo) || !/^[\dK]$/.test(dv)) return false
  let suma = 0
  let mult = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * mult
    mult = mult === 7 ? 2 : mult + 1
  }
  const resto = 11 - (suma % 11)
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return dv === esperado
}

export const formatoCLP = (n) => `$${Number(n).toLocaleString('es-CL')}`
