import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../pages/Login'


vi.mock('../data/db', () => ({
  login: vi.fn()
}))

import { login } from '../data/db'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Componente Login', () => {
  it('debe renderizar el formulario de login correctamente', () => {
    renderWithRouter(<Login />)
    
    
    expect(screen.getByRole('heading', { name: /iniciar sesion/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesion/i })).toBeInTheDocument()
  })

  it('debe mostrar error cuando el email es inválido', () => {
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /iniciar sesion/i })
    
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/email valido/i)).toBeInTheDocument()
  })

  it('debe mostrar error cuando la contraseña tiene menos de 6 caracteres', () => {
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /iniciar sesion/i })
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument()
  })

  it('debe mostrar error cuando las credenciales son incorrectas', () => {
    login.mockReturnValue(null)
    
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /iniciar sesion/i })
    
    fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)
    
    expect(screen.getByText(/email o contraseña incorrectos/i)).toBeInTheDocument()
  })

  it('debe llamar a la función login con los datos correctos', () => {
    login.mockReturnValue({ id: 1, email: 'test@test.com', tipo: 'cliente' })
    
    renderWithRouter(<Login />)
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/contraseña/i)
    const submitButton = screen.getByRole('button', { name: /iniciar sesion/i })
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: '123456' } })
    fireEvent.click(submitButton)
    
    expect(login).toHaveBeenCalledWith('test@test.com', '123456')
  })

  it('debe mostrar el enlace de registro', () => {
    renderWithRouter(<Login />)
    
    
    expect(screen.getByText(/registrate aqui/i)).toBeInTheDocument()
  })
})