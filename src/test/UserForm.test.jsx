import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import UserForm from '../components/admin/UserForm'

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Componente UserForm', () => {
  const mockOnGuardar = vi.fn()
  const mockOnCancelar = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('debe renderizar el formulario de nuevo usuario', () => {
    renderWithRouter(
      <UserForm 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    expect(screen.getByRole('button', { name: /crear usuario/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/rut/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
  })

  it('debe mostrar error cuando el RUT es inválido', () => {
    renderWithRouter(
      <UserForm 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    const rutInput = screen.getByLabelText(/rut/i)
    const submitButton = screen.getByRole('button', { name: /crear usuario/i })
    
    fireEvent.change(rutInput, { target: { value: '123' } })
    fireEvent.click(submitButton)
    
    // El mensaje real que muestra tu componente es este:
    const errores = screen.getAllByText(/7 y 9 dígitos/i)
    expect(errores.length).toBeGreaterThan(0)
  })

  it('debe mostrar error cuando el nombre tiene menos de 3 caracteres', () => {
    renderWithRouter(
      <UserForm 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    const nombreInput = screen.getByLabelText(/nombre/i)
    const submitButton = screen.getByRole('button', { name: /crear usuario/i })
    
    fireEvent.change(nombreInput, { target: { value: 'Jo' } })
    fireEvent.click(submitButton)
    
    const errores = screen.getAllByText(/al menos 3 caracteres/i)
    expect(errores.length).toBeGreaterThan(0)
  })

  it('debe mostrar error cuando el email no tiene formato válido', () => {
    renderWithRouter(
      <UserForm 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /crear usuario/i })
    
    fireEvent.change(emailInput, { target: { value: 'email-invalido' } })
    fireEvent.click(submitButton)
    
    const errores = screen.getAllByText(/email debe contener/i)
    expect(errores.length).toBeGreaterThan(0)
  })

  it('debe llamar a onGuardar cuando el formulario es válido', () => {
    renderWithRouter(
      <UserForm 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    fireEvent.change(screen.getByLabelText(/rut/i), { target: { value: '12.345.678-9' } })
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Juan' } })
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: 'Perez' } })
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'juan@test.com' } })
    // Usamos "contraseña" con tilde porque así está en tu componente
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: '123456' } }) 
    fireEvent.change(screen.getByLabelText(/dirección/i), { target: { value: 'Av. Siempre Viva 123' } })
    fireEvent.change(screen.getByLabelText(/comuna/i), { target: { value: 'Santiago' } })
    
    fireEvent.click(screen.getByRole('button', { name: /crear usuario/i }))
    
    expect(mockOnGuardar).toHaveBeenCalledWith(expect.objectContaining({
      rut: '12.345.678-9',
      nombre: 'Juan',
      apellido: 'Perez',
      email: 'juan@test.com',
      password: '123456',
      direccion: 'Av. Siempre Viva 123',
      comuna: 'Santiago'
    }))
  })

  it('debe llamar a onCancelar cuando se hace clic en el botón cancelar', () => {
    renderWithRouter(
      <UserForm 
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    fireEvent.click(screen.getByRole('button', { name: /cancelar/i }))
    
    expect(mockOnCancelar).toHaveBeenCalled()
  })

  it('debe cargar los datos del usuario en modo edición', () => {
    const usuarioEdicion = {
      id: 1,
      rut: '12.345.678-9',
      nombre: 'Maria',
      apellido: 'Gonzalez',
      email: 'maria@test.com',
      tipo: 'administrador'
    }
    
    renderWithRouter(
      <UserForm 
        usuario={usuarioEdicion}
        onGuardar={mockOnGuardar} 
        onCancelar={mockOnCancelar} 
      />
    )
    
    expect(screen.getByRole('button', { name: /actualizar usuario/i })).toBeInTheDocument()
    expect(screen.getByDisplayValue('Maria')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Gonzalez')).toBeInTheDocument()
    expect(screen.getByDisplayValue('maria@test.com')).toBeInTheDocument()
  })
})