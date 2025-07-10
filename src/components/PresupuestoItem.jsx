import React, { useState } from 'react'
import Badge from './Badge'
import Modal from './Modal'
import { IconEdit, IconTrash } from './Icons'

function PresupuestoItem({ presupuesto, onEditar, onEliminar }) {
  const [showModal, setShowModal] = useState(false)
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false)

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
      <h3 style={{ marginBottom: '10px', color: '#333' }}>{presupuesto.cliente} <Badge>{presupuesto.trabajo}</Badge></h3>
      <p style={{ margin: '4px 0' }}>
        <strong>Vehículo:</strong> {presupuesto.vehiculo}
      </p>
      <p style={{ margin: '4px 0', marginBottom: '14px' }}>
        <strong>Precio:</strong> ${presupuesto.precio}
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={onEditar}
          style={{
            flex: 1,
            backgroundColor: '#6366f1',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <IconEdit size={16} /> Editar
        </button>
        <button
          onClick={() => setShowModal(true)}
          style={{
            flex: 1,
            backgroundColor: '#ef4444',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
          }}
        >
          <IconTrash size={16} /> Eliminar
        </button>
      </div>
      <Modal
        show={showModal}
        title="Confirmar eliminación"
        message="¿Deseas eliminar este presupuesto? Esta acción no se puede deshacer."
        onConfirm={() => {
          setShowModal(false);
          setShowDeleteSuccess(true);
          setTimeout(() => {
            setShowDeleteSuccess(false);
            onEliminar();
          }, 1400);
        }}
        onCancel={() => setShowModal(false)}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        danger
      />
      <Modal
        show={showDeleteSuccess}
        title="¡Eliminado!"
        message="El presupuesto fue eliminado correctamente."
        autoClose
      />
    </div>
  )
}

export default PresupuestoItem
