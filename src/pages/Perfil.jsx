import React, { useEffect, useState } from 'react'
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
