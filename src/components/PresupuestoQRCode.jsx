import React from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function PresupuestoQRCode({ data }) {
  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <p style={{ fontWeight: '600', marginBottom: '10px' }}>
        Escaneá este código QR desde otro dispositivo
      </p>
      <QRCodeCanvas value={data} size={180} />
    </div>
  )
}

export default PresupuestoQRCode
