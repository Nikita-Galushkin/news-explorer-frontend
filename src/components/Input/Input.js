import React from 'react';
import './Input.css';

function Input({
  placeholder,
  type,
  name,
  className,
  action,
  labelValue,
  minLength,
  maxLength,
  value,
  onChange,
  errorText,
}) {
  
  return (
    <label className="popup__label">
      {labelValue}
      <input
        action={action}
        placeholder={placeholder}
        type={type}
        name={name}
        className={className}
        minLength={minLength}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        required
      />
      <span className="popup__error popup__error_visible" id={`${name}-error`}>
        {errorText}
      </span>
    </label>
  );
}

export default Input;