// src/pages/PresupuestoDetalle.jsx
import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { PresupuestosContext } from '../context/PresupuestosContext.jsx'
import PresupuestoQRCode from '../components/PresupuestoQRCode.jsx'

function PresupuestoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { presupuestos } = useContext(PresupuestosContext)

  const presupuesto = presupuestos.find((p) => p.id === Number(id))

  if (!presupuesto) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>Presupuesto no encontrado</h2>
        <button
          onClick={() => navigate('/presupuestos')}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Volver al listado
        </button>
      </div>
    )
  }

  console.log('ID presupuesto:', presupuesto.id) // debug

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
        maxWidth: '500px',
        width: '100%',
      }}>
        <h2 style={{ marginBottom: '20px' }}>Detalle del presupuesto</h2>
        <p><strong>Cliente:</strong> {presupuesto.cliente}</p>
        <p><strong>Vehículo:</strong> {presupuesto.vehiculo}</p>
        <p><strong>Trabajo:</strong> {presupuesto.trabajo}</p>
        <p><strong>Precio estimado:</strong> ${presupuesto.precio}</p>

        {/* QR */}
        <PresupuestoQRCode presupuestoId={presupuesto.id} />

        <button
          onClick={() => navigate('/presupuestos')}
          style={{
            marginTop: '30px',
            padding: '10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            width: '100%',
            cursor: 'pointer',
          }}
        >
          Volver al listado
        </button>
      </div>
    </div>
  )
}

export default PresupuestoDetalle
