import React from 'react';

function Badge({ children, color = '#6366f1', background = '#e0e7ff' }) {
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '8px',
      background,
      color,
      fontWeight: 600,
      fontSize: '0.9rem',
      marginLeft: 8
    }}>
      {children}
    </span>
  );
}

export default Badge;
