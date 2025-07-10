import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api.js'
import { usePresupuestosQuery } from '../api/usePresupuestosQuery.js'

function LoginPage() {
  const api = usePresupuestosQuery()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.mutateAsync({ email, password })
      console.log('Login response:', res)
      const token = res.token
      localStorage.setItem('token', token)
      navigate('/presupuestos')
    } catch (err) {
      setError('Email o contraseña incorrectos')
    }
  }

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '80px auto',
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.1)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
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
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '1.2rem',
            cursor: 'pointer',
            boxShadow: '0 3px 10px rgba(0,123,255,0.4)',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
        >
          Iniciar sesión
        </button>
      </form>

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
  )
}

export default LoginPage
