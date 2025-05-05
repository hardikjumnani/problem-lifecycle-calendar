import React from 'react';
import './Button.css'; // Optional CSS

function Button({ label, onClick, type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} className={`custom-button ${className}`}>
      {label}
    </button>
  );
}

export default Button;
