import React from 'react';
import { IconCheck, IconEdit } from './Icons';

function ButtonModern({ children, variant = 'primary', icon, ...props }) {
  let bg = 'linear-gradient(90deg, #6366f1 0%, #60a5fa 100%)';
  let color = '#fff';
  if (variant === 'danger') {
    bg = 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)';
  } else if (variant === 'secondary') {
    bg = '#f3f4f6';
    color = '#222';
  }
  return (
    <button
      style={{
        width: '100%',
        padding: '14px',
        background: bg,
        color,
        border: 'none',
        borderRadius: '10px',
        fontWeight: '700',
        fontSize: '1.1rem',
        cursor: 'pointer',
        boxShadow: '0 3px 10px rgba(99,102,241,0.15)',
        transition: 'background 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        marginTop: 18
      }}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
}

export default ButtonModern;
