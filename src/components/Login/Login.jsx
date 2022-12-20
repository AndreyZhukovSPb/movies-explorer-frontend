import React from 'react';  
import './Login.css';
import Form from '../Form/Form'


const Register = props => {
  
  const { onLogin } = props;

  return (
    <Form
      name = {'loginForm'}
      FormTitle = {'Рады видеть!'}
      FormButtonText = {'Войти'}
      FormText = {'Ещё не зарегистрированы? '}
      FormLinkText = {'Регистрация'}
      FormLinkPath = {'./sign-up'}
      onSubmit = {onLogin}
      isRegForm = {false}
    />
  )
}  

export default Register;