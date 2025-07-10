import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!email.trim()) {
      setError('Por favor ingresa tu email')
      return
    }
    // Aquí simulamos el envío del mail
    setMensaje(`Se envió un correo a ${email} con instrucciones para recuperar tu contraseña.`)
    setEmail('')
  }

  return (
    <FormContainer title="Recuperar Contraseña">
      <form onSubmit={handleSubmit} aria-label="Formulario de recuperación de contraseña">
        {error && <AlertMessage message={error} />}
        {mensaje && (
          <p
            style={{
              backgroundColor: '#d1e7dd',
              color: '#0f5132',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '18px',
              fontWeight: '600',
              textAlign: 'center',
              border: '1.5px solid #badbcc',
            }}
          >
            {mensaje}
          </p>
        )}

        <InputField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ejemplo@dominio.com"
          ariaLabel="Campo para ingresar email para recuperación"
        />

        <Button type="submit" variant="primary">
          Enviar instrucciones
        </Button>

        <Button
          type="button"
          variant="secondary"
          style={{ marginTop: '12px' }}
          onClick={() => navigate('/')}
        >
          Volver al login
        </Button>
      </form>
    </FormContainer>
  )
}

export default ForgotPasswordPage
