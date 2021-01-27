import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Input from '../Input/Input';
import useFormValidation from '../../hooks/FormValidator';

function Login({ onLogin, isOpen, onClose, changeModal }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);
  };

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={'login'}
      title={'Вход'}
      btnValue={'Войти'}
      isOpen={isOpen}
      onClose={onClose}
      changeModalValue={'Зарегистрироваться'}
      changeModal={changeModal}
      text={'или '}
      isValid={isValid}
    >
      <Input
        labelValue={'Email'}
        placeholder={'Введите email'}
        type={'email'}
        name={'email'}
        className={'popup__input'}
        value={values.email || ''}
        onChange={handleChange}
        errorText={errors.email || ''}
      />
      <Input
        labelValue={'Пароль'}
        placeholder={'Введите пароль'}
        type={'password'}
        name={'password'}
        className={'popup__input'}
        value={values.password || ''}
        onChange={handleChange}
        errorText={errors.password || ''}
      />
    </PopupWithForm>
  );
}

export default Login;
