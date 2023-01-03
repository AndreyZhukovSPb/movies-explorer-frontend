import React from 'react';  
import './Register.css';
import Form from '../Form/Form'


const Register = props => {
  
  const { onRegister, registerErrorMessage, cleanErrorMessage } = props;

  return (
    <Form
      name = {'registerForm'}
      FormTitle = {'Добро пожаловать!'}
      FormButtonText = {'Зарегистрироваться'}
      FormText = {'Уже зарегистрированы? '}
      FormLinkText = {'Войти'}
      FormLinkPath = {'./sign-in'}
      onSubmit = {onRegister}
      isRegForm = {true}
      registerErrorMessage = {registerErrorMessage}
      cleanErrorMessage = {cleanErrorMessage}
    />
  )
}  

export default Register;