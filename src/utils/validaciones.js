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

// Valida que el número de tarjeta tenga exactamente 16 dígitos numéricos (ignora espacios)
export const esTarjetaValida = (tarjeta) => /^\d{16}$/.test(String(tarjeta).replace(/\s/g, ''))

// Valida que el código CVV tenga estrictamente 3 o 4 dígitos numéricos
export const esCVVValido = (cvv) => /^\d{3,4}$/.test(String(cvv))

// Valida formato de fecha de expiración (MM/AA o MM/YY)
export const esExpiracionValida = (exp) => {
  const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
  return regex.test(String(exp))
}