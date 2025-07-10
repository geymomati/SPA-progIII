import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

function QrLoginPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')

    if (token) {
      fetch(`http://localhost:5208/api/qr/generate-qr`)
        .then((res) => res.json())
        .then((data) => {
          if (data.token && data.usuario) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('usuarioLogueado', JSON.stringify(data.usuario))
            navigate('/presupuestos')
          } else {
            alert('QR inválido o expirado')
          }
        })
        .catch(() => alert('Error al iniciar sesión con QR'))
    }
  }, [params, navigate])

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
        textAlign: 'center',
      }}>
        <h2>Iniciando sesión...</h2>
        <p>Espere un momento</p>
      </div>
    </div>
  )
}

export default QrLoginPage
