/* import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react' 

function Perfil() {
  const [qrUrl, setQrUrl] = useState('')
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'))

  useEffect(() => {
    if (!usuario?.email) return

    fetch(`https://MIBACK/api/auth/generar-qr?email=${usuario.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          setQrUrl(data.url)
        }
      })
      .catch((err) => console.error('Error al generar QR', err))
  }, [usuario])

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Perfil del Usuario</h2>
      <p><strong>Email:</strong> {usuario?.email || 'No disponible'}</p>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h3>Escaneá para iniciar sesión en otro dispositivo</h3>
        {qrUrl ? <QRCode value={qrUrl} size={240} /> : <p>Cargando QR...</p>}
      </div>
    </div>
  )
}

export default Perfil
 */

// src/components/Perfil.jsx
import React, { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import axiosInstance from '../api/axios'

function Perfil() {
  const [qrUrl, setQrUrl] = useState('')
  const [qrId, setQrId] = useState('')
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

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '20px' }}>
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
    </div>
  )
}

export default Perfil
