import React from 'react';
import './Button.css';

function Button({ name, className, onClick }) {

  return (
    <button className={className} onClick={onClick}>{name}</button>
  );
}

export default Button;