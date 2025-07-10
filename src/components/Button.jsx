// src/components/Button.jsx

import React from 'react'
import './Button.css'

function Button({ children, onClick, type = 'button', variant = 'primary', ...props }) {
  return (
    <button
      type={type}
      className={`custom-button ${variant}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
