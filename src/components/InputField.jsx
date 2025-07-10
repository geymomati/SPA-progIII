import React from 'react'
import './InputField.css'

function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  ariaLabel,
}) {
  return (
    <div className="input-group">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel || undefined}
        required
        className="input-field"
      />
    </div>
  )
}

export default InputField
