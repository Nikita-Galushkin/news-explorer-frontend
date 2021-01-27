import React from 'react'
import './PopupWithForm.css';

function PopupWithForm({
  name,
  title,
  onSubmit,
  children,
  btnValue,
  onClose,
  isOpen,
  changeModalValue,
  changeModal,
  text,
  isValid,
  errorValidation,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} onClick={onClose}>
      <form onSubmit={onSubmit} name={name} action="#" method="POST" className={`popup__form popup__form_type_${name}`} noValidate>
        <h2 className="popup__title">{title}</h2>
        {children}
        <span className="popup__button-error popup__button-error_visible">
          {errorValidation}
        </span>
        <button type="submit" value="" className={`popup__button ${!isValid ? 'popup__button_type_disable' : ''}`} disabled={!isValid === true} >
          {btnValue}
        </button>
        <p className={`popup__change-modal popup__change-modal_type_${name}`} onClick={changeModal}>
          {text}
          <span style={{ color: "#2F71E5" }}>
            {changeModalValue}
          </span>
        </p>
        <button type="reset" className="popup__button-close" onClick={onClose}></button>
      </form>
    </div>
  );
}

export default PopupWithForm;

