// src/components/AlertMessage.jsx

import React from 'react'
import './AlertMessage.css'

function AlertMessage({ message, type = 'error' }) {
  return (
    <div className={`alert-message ${type}`} role="alert" aria-live="assertive">
      {message}
    </div>
  )
}

export default AlertMessage
