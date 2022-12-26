import React from 'react';  
import './Register.css';
import Form from '../Form/Form'
import { useHistory, Route, Switch } from 'react-router-dom';


const Register = props => {
  
  const { onRegister } = props;

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
    />
  )
}  

export default Register;