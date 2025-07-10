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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Iniciando sesión...</h2>
      <p>Espere un momento</p>
    </div>
  )
}

export default QrLoginPage
