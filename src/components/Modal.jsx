import React, { useEffect } from 'react'
import Button from './Button'

function Modal({ show, title, message, onConfirm, onCancel, confirmText = 'Aceptar', cancelText = 'Cancelar', danger = false, autoClose = false }) {
  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        if (onConfirm) onConfirm()
      }, 1400)
      return () => clearTimeout(timer)
    }
  }, [show, autoClose, onConfirm])

  if (!show) return null
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        background: '#fff', borderRadius: '12px', padding: '32px 24px', minWidth: 300, textAlign: 'center',
        boxShadow: '0 4px 18px rgba(0,0,0,0.13)'
      }}>
        <h3 style={{marginBottom: 18, color: danger ? '#e74c3c' : '#2d3a4a'}}>{title}</h3>
        <p style={{marginBottom: 24}}>{message}</p>
        {!autoClose && (
          <div style={{display: 'flex', justifyContent: 'center', gap: 16}}>
            <Button variant={danger ? 'danger' : 'primary'} onClick={onConfirm}>{confirmText}</Button>
            {cancelText && <Button variant="secondary" onClick={onCancel}>{cancelText}</Button>}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
