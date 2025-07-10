import React from 'react'
import QRCode from 'react-qr-code'

function PresupuestoQRCode({ presupuestoId }) {
  const urlDetalle = `${window.location.origin}/presupuestos/detalle/${presupuestoId}`

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <p style={{ marginBottom: '8px', fontWeight: '600' }}>
        Escaneá el código QR para ver el detalle del presupuesto online:
      </p>
      <QRCode value={urlDetalle} size={150} />
      <p style={{ fontSize: '0.9rem', color: '#555', marginTop: '8px', wordBreak: 'break-word' }}>
        {urlDetalle}
      </p>
    </div>
  )
}

export default PresupuestoQRCode
