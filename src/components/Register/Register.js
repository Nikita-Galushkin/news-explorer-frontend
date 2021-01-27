import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Input from '../Input/Input';
import useFormValidation from '../../hooks/FormValidator';

function Register({ onRegister, isOpen, onClose, changeModal }) {
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.email, values.password, values.name);
  };

  React.useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      name={'register'}
      title={'Регистрация'}
      btnValue={'Зарегистрироваться'}
      isOpen={isOpen}
      onClose={onClose}
      changeModalValue={'Войти'}
      changeModal={changeModal}
      text={'или '}
      isValid={isValid}
      errorValidation={'Такой пользователь уже есть'}
    >
      <Input
        labelValue={'Email'}
        placeholder={'Введите почту'}
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

      <Input
        labelValue={'Имя'}
        placeholder={'Введите своё имя'}
        type={'name'}
        name={'name'}
        className={'popup__input'}
        value={values.name || ''}
        onChange={handleChange}
        errorText={errors.name || ''}
      />
    </PopupWithForm>
  );
}

export default Register;