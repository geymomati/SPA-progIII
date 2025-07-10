import React from 'react'
import './FormContainer.css'

function FormContainer({ title, children }) {
  return (
    <div className="form-container">
      <h2 className="form-title">{title}</h2>
      {children}
    </div>
  )
}

export default FormContainer
