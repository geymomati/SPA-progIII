import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api.js'
import { usePresupuestosQuery } from '../api/usePresupuestosQuery.js'
import Modal from '../components/Modal'
import ButtonModern from '../components/ButtonModern'
import { IconCheck, IconArrowLeft } from '../components/Icons'

function LoginPage() {
  const api = usePresupuestosQuery()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.mutateAsync({ email, password })
      const token = res.token
      localStorage.setItem('token', token)
      setModalMessage('¡Inicio de sesión exitoso!')
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        navigate('/presupuestos')
      }, 1200)
    } catch (err) {
      setModalMessage('Email o contraseña incorrectos')
      setShowModal(true)
    }
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
            marginBottom: 18
          }}
          aria-label="Volver"
        >
          <IconArrowLeft size={20} /> Volver
        </button>
        <h2
          style={{
            marginBottom: '28px',
            textAlign: 'center',
            color: '#222',
            fontWeight: '700',
            fontSize: '1.9rem',
          }}
        >
          Iniciar Sesión
        </h2>
        {error && (
          <p
            style={{
              backgroundColor: '#f8d7da',
              color: '#842029',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '18px',
              fontWeight: '600',
              textAlign: 'center',
              border: '1.5px solid #f5c2c7',
            }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '18px' }}>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#444',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="ejemplo@dominio.com"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.8px solid #ccc',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>
          <div style={{ marginBottom: '12px' }}>
            <label
              htmlFor="password"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#444',
              }}
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '8px',
                border: '1.8px solid #ccc',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#007bff')}
              onBlur={(e) => (e.target.style.borderColor = '#ccc')}
            />
          </div>
          <ButtonModern
            type="submit"
            variant="primary"
            icon={<IconCheck size={18} />}
          >
            Iniciar sesión
          </ButtonModern>
        </form>
        <Modal
          show={showModal}
          title={modalMessage === '¡Inicio de sesión exitoso!' ? '¡Éxito!' : 'Atención'}
          message={modalMessage}
          onConfirm={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          confirmText="Cerrar"
          cancelText=""
          autoClose={modalMessage === '¡Inicio de sesión exitoso!'}
        />

        <p style={{ marginTop: '15px' }}>
          ¿Olvidaste tu contraseña?{' '}
          <button
            onClick={() => navigate('/forgot-password')}
            style={{
              color: 'blue',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: '1rem',
            }}
            aria-label="Ir a recuperación de contraseña"
          >
            Recuperarla aquí
          </button>
        </p>

        <p style={{ marginTop: '15px' }}>
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => navigate('/register')}
            style={{
              color: 'blue',
              textDecoration: 'underline',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
