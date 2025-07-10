import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'
import Modal from '../components/Modal'
import ButtonModern from '../components/ButtonModern'
import { IconCheck, IconArrowLeft } from '../components/Icons'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!email.trim()) {
      setModalMessage('Por favor ingresa tu email')
      setShowModal(true)
      return
    }
    setModalMessage(`Se envió un correo a ${email} con instrucciones para recuperar tu contraseña.`)
    setShowModal(true)
    setEmail('')
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '14px',
          boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
          padding: '36px 28px',
          minWidth: '320px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#6366f1',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            marginBottom: 18,
          }}
          aria-label="Volver"
        >
          <IconArrowLeft size={20} /> Volver
        </button>
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

            <ButtonModern type="submit" variant="primary" icon={<IconCheck size={18} />}>
              Enviar instrucciones
            </ButtonModern>
            <ButtonModern
              type="button"
              variant="secondary"
              style={{ marginTop: '12px' }}
              onClick={() => navigate('/')}
            >
              Volver al login
            </ButtonModern>
            <Modal
              show={showModal}
              title={modalMessage.includes('correo') ? '¡Éxito!' : 'Atención'}
              message={modalMessage}
              onConfirm={() => setShowModal(false)}
              onCancel={() => setShowModal(false)}
              confirmText="Cerrar"
              cancelText=""
              autoClose={modalMessage.includes('correo')}
            />
          </form>
        </FormContainer>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
