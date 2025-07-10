import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function QrLoginGenerator({ user }) {
  const loginToken = btoa(JSON.stringify({ email: user.email, token: user.token }))
  const qrURL = `https://tu-backend.com/api/auth/qr-login?data=${loginToken}`

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h3>Escaneá este código QR para iniciar sesión</h3>
      <QRCodeCanvas value={qrURL} size={256} />
      <p style={{ marginTop: '10px', color: '#666' }}>
        El QR contiene tu sesión. No lo compartas.
      </p>
    </div>
  )
}

export default QrLoginGenerator
