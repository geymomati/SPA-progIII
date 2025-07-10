// src/components/Perfil.jsx
import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import axiosInstance from '../api/axios'
import Modal from '../components/Modal'
import ButtonModern from '../components/ButtonModern'
import { IconArrowLeft } from '../components/Icons'

function Perfil() {
  const [qrUrl, setQrUrl] = useState('')
  const [qrId, setQrId] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'))

  useEffect(() => {
    const obtenerQR = async () => {
      try {
        const res = await axiosInstance.get('/api/qr/generate-qr')
        setQrUrl(res.data.loginUrl)
        setQrId(res.data.qrSessionId)
      } catch (err) {
        console.error('Error al obtener el QR:', err)
      }
    }

    obtenerQR()
  }, [])

  const handleLogout = () => {
    setModalMessage('¿Deseas cerrar sesión?')
    setShowModal(true)
  }

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogueado');
    window.location.href = '/';
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
          onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign('/login')}
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
        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Perfil del Usuario</h2>
        <p><strong>Email:</strong> {usuario?.email || 'No disponible'}</p>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <h3>Escaneá para iniciar sesión en otro dispositivo</h3>
          {qrUrl ? (
            <>
              <QRCodeCanvas value={qrUrl} size={240} />
              <p style={{ marginTop: '10px', fontSize: '0.9rem', color: '#666' }}>
                QR válido para sesión con ID: {qrId}
              </p>
            </>
          ) : (
            <p>Cargando QR...</p>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <ButtonModern
            variant="danger"
            onClick={handleLogout}
          >
            Cerrar sesión
          </ButtonModern>
          <Modal
            show={showModal}
            title="Confirmar acción"
            message={modalMessage}
            onConfirm={confirmLogout}
            onCancel={() => setShowModal(false)}
            confirmText="Sí, cerrar sesión"
            cancelText="Cancelar"
            danger
          />
        </div>
      </div>
    </div>
  )
}

export default Perfil
