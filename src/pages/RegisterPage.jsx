// src/pages/RegisterPage.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FormContainer from '../components/FormContainer'
import InputField from '../components/InputField'
import Button from '../components/Button'
import AlertMessage from '../components/AlertMessage'
import axiosInstance from '../api/axios'
import Modal from '../components/Modal'
import { IconCheck, IconArrowLeft } from '../components/Icons'

function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  // nuevos campos
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [dni, setDni] = useState('')
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    setModalMessage('¿Deseas registrar este usuario?')
    setShowModal(true)
  }

  const handleConfirmRegister = async () => {
    setShowModal(false)
    try {
      await axiosInstance.post('/api/auth/register', {
        email,
        password,
        firstName: nombre,
        lastName: apellido,
        dni
      })
      setModalMessage('Usuario registrado correctamente')
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        setShowDeleteSuccess(true)
        setTimeout(() => {
          setShowDeleteSuccess(false)
          navigate('/')
        }, 1400)
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar usuario')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '14px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.10)',
        padding: '36px 28px',
        minWidth: '320px',
        maxWidth: '400px',
        width: '100%',
      }}>
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
        <FormContainer title={<span style={{fontWeight:'700',fontSize:'2rem',color:'#2d3a4a'}}>Registro de Usuario</span>}>
          <form
            onSubmit={handleSubmit}
            role="form"
            aria-label="Formulario de registro de usuario"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              minWidth: '320px',
              maxWidth: '370px',
              margin: '0 auto',
            }}
          >
            {error && <AlertMessage message={error} />}
            <InputField
              id="nombre"
              label="Nombre"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
              ariaLabel="Campo para ingresar el nombre"
            />
            <InputField
              id="apellido"
              label="Apellido"
              type="text"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Apellido"
              ariaLabel="Campo para ingresar el apellido"
            />
            <InputField
              id="dni"
              label="DNI"
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              placeholder="DNI"
              ariaLabel="Campo para ingresar el DNI"
            />
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
            <Button
              type="submit"
              variant="primary"
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '1.1rem',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(99,102,241,0.15)',
                transition: 'background 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span style={{marginRight: 8}}>Registrarse</span>
              <IconCheck size={18} />
            </Button>
          </form>
        </FormContainer>
        <Modal
          show={showModal}
          title={modalMessage === 'Usuario registrado correctamente' ? '¡Éxito!' : 'Confirmar registro'}
          message={modalMessage}
          onConfirm={modalMessage === 'Usuario registrado correctamente' ? () => setShowModal(false) : handleConfirmRegister}
          onCancel={() => setShowModal(false)}
          confirmText={modalMessage === 'Usuario registrado correctamente' ? 'Cerrar' : 'Sí, registrar'}
          cancelText={modalMessage === 'Usuario registrado correctamente' ? '' : 'Cancelar'}
          autoClose={modalMessage === 'Usuario registrado correctamente'}
        />
        <Modal
          show={showDeleteSuccess}
          title="¡Registro exitoso!"
          message="El usuario fue registrado correctamente."
          autoClose
        />
      </div>
    </div>
  )
}

export default RegisterPage
