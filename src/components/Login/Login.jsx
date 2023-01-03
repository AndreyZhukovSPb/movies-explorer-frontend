import React from 'react';  
import './Login.css';
import Form from '../Form/Form'


const Login = props => {
  
  const { onLogin, loginErrorMessage, cleanErrorMessage } = props;

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
      loginErrorMessage = {loginErrorMessage}
      cleanErrorMessage = {cleanErrorMessage}
    />
  )
}  

export default Login;