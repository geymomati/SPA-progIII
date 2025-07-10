import React from 'react'

function PresupuestoItem({ presupuesto, onEditar, onEliminar }) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        backgroundColor: '#fff'
      }}
    >
      <h3 style={{ marginBottom: '10px', color: '#333' }}>{presupuesto.cliente}</h3>
      <p style={{ margin: '4px 0' }}>
        <strong>Vehículo:</strong> {presupuesto.vehiculo}
      </p>
      <p style={{ margin: '4px 0' }}>
        <strong>Trabajo:</strong> {presupuesto.trabajo}
      </p>
      <p style={{ margin: '4px 0', marginBottom: '14px' }}>
        <strong>Precio:</strong> ${presupuesto.precio}
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onEditar}
          style={{
            flex: 1,
            backgroundColor: '#ffc107',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            color: '#333',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Editar
        </button>
        <button
          onClick={onEliminar}
          style={{
            flex: 1,
            backgroundColor: '#dc3545',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default PresupuestoItem
