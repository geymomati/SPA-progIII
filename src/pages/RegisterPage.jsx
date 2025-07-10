// src/pages/RegisterPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    // Aquí simulamos registro exitoso
    alert(`Usuario registrado: ${email}`)
    navigate('/') // Volver a login
  }

  return (
    <FormContainer title="Registro de Usuario">
      <form onSubmit={handleSubmit} role="form" aria-label="Formulario de registro de usuario">
        {error && <AlertMessage message={error} />}

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@dominio.com"
          ariaLabel="Campo para ingresar el email"
        />

        <InputField
          id="password"
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          ariaLabel="Campo para ingresar la contraseña"
        />

        <InputField
          id="confirmPassword"
          label="Confirmar contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="********"
          ariaLabel="Campo para confirmar la contraseña"
        />

        <Button type="submit" variant="primary">
          Registrarse
        </Button>
      </form>
    </FormContainer>
  )
}

export default RegisterPage
